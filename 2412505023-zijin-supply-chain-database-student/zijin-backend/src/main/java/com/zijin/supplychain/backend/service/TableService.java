package com.zijin.supplychain.backend.service;

import com.zijin.supplychain.backend.table.TableDefinition;
import com.zijin.supplychain.backend.table.TableRegistry;
// JdbcTemplate 是 Spring JDBC 提供的数据库操作类，用来执行 SQL、接收查询结果。
// 它不是我们自己写的类，完整类名是 org.springframework.jdbc.core.JdbcTemplate。
import org.springframework.jdbc.core.JdbcTemplate;
// Service 注解表示这是业务逻辑类，会交给 Spring 管理。
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

// 业务逻辑层：负责检查表名、解析 CSV、调用 JdbcTemplate 操作 MySQL。
@Service
public class TableService {

    // JdbcTemplate 由 Spring Boot 根据 application.properties 自动创建。
    // 后面查询、统计、导入数据时，都是通过它执行 SQL。
    private final JdbcTemplate jdbcTemplate;
    // TableRegistry 是表名白名单，防止外部随便操作任意表。
    private final TableRegistry tableRegistry;

    public TableService(JdbcTemplate jdbcTemplate, TableRegistry tableRegistry) {
        // 这是 TableService 类的构造方法，不是 JdbcTemplate 的构造方法。
        // Spring Boot 启动时会自动把 JdbcTemplate 和 TableRegistry 传进来。
        // this.jdbcTemplate 表示当前 TableService 对象里的成员变量。
        // 右边的 jdbcTemplate 是构造方法括号里传进来的参数。
        this.jdbcTemplate = jdbcTemplate;
        // 这两行是赋值：把传进来的对象保存到当前 TableService 里面，后面方法才能使用。
        this.tableRegistry = tableRegistry;
    }

    public List<String> tableNames() {
        // 返回后端允许操作的表名列表。
        return tableRegistry.names();
    }

    public Map<String, Object> count(String tableName) {
        // 先检查表名是否合法，并拿到这张表的字段和主键信息。
        TableDefinition table = tableRegistry.require(tableName);
        // 执行 SELECT COUNT(*)，查询这张表有多少条记录。
        Long count = jdbcTemplate.queryForObject(table.countSql(), Long.class);
        // 返回给 Controller，最后会变成 JSON。
        return Map.of("table", table.name(), "count", count == null ? 0L : count);
    }

    public Map<String, Object> list(String tableName, int limit) {
        // 先检查表名，避免直接拼接外部传入的非法表名。
        TableDefinition table = tableRegistry.require(tableName);
        // 限制最多只查 100 行，避免一次查太多数据。
        int safeLimit = Math.max(1, Math.min(limit, 100));
        // 执行 SELECT ... LIMIT ?，safeLimit 会填入 SQL 的 ? 位置。
        List<Map<String, Object>> queryRows = jdbcTemplate.queryForList(table.listSql(), safeLimit);

        // 把查询结果按字段顺序转成二维列表，方便前端表格展示。
        List<List<Object>> rows = queryRows.stream()
                .map(row -> table.columns().stream().map(row::get).toList())
                .toList();

        // 返回表名、主键、字段名、数据行。
        return Map.of(
                "table", table.name(),
                "primaryKey", table.primaryKey(),
                "columns", table.columns(),
                "rows", rows
        );
    }

    public Map<String, Object> createRow(String tableName, Map<String, Object> row) {
        // 新增单条记录：前端传入一整行字段，后端按表字段顺序写入数据库。
        TableDefinition table = tableRegistry.require(tableName);
        validateAllColumns(table, row);

        Object[] values = table.columns().stream()
                .map(column -> normalizeValue(row.get(column)))
                .toArray();
        int affected = jdbcTemplate.update(table.insertSql(), values);

        return Map.of(
                "table", table.name(),
                "primaryKey", table.primaryKey(),
                "created", affected
        );
    }

    public Map<String, Object> updateRow(String tableName, String id, Map<String, Object> row) {
        // 修改单条记录：主键不允许修改，只按主键定位并更新其他字段。
        TableDefinition table = tableRegistry.require(tableName);
        validatePrimaryKey(id, table.primaryKey());
        validateEditableColumns(table, row);

        List<Object> values = new ArrayList<>();
        for (String column : table.editableColumns()) {
            values.add(normalizeValue(row.get(column)));
        }
        values.add(id.trim());

        int affected = jdbcTemplate.update(table.updateSql(), values.toArray());
        if (affected == 0) {
            throw new IllegalArgumentException("没有找到要修改的记录：" + id);
        }

        return Map.of(
                "table", table.name(),
                "primaryKey", table.primaryKey(),
                "id", id,
                "updated", affected
        );
    }

    public Map<String, Object> deleteRow(String tableName, String id) {
        // 删除单条记录：只允许按主键删除，表名仍然必须在白名单里。
        TableDefinition table = tableRegistry.require(tableName);
        validatePrimaryKey(id, table.primaryKey());

        int affected = jdbcTemplate.update(table.deleteSql(), id.trim());
        if (affected == 0) {
            throw new IllegalArgumentException("没有找到要删除的记录：" + id);
        }

        return Map.of(
                "table", table.name(),
                "primaryKey", table.primaryKey(),
                "id", id,
                "deleted", affected
        );
    }

    public Map<String, Object> importCsv(String tableName, String csvText) {
        // 导入前也要先检查表名是否合法。
        TableDefinition table = tableRegistry.require(tableName);
        // 把上传的 CSV 文本解析成多行多列。
        List<List<String>> parsedRows = CsvParser.parse(csvText);
        if (parsedRows.isEmpty()) {
            // 没有数据时，不写数据库，直接返回导入 0 行。
            return Map.of("table", table.name(), "inserted", 0, "columns", table.columns());
        }

        // 判断 CSV 第一行是不是表头，例如 order_id,order_date,...。
        boolean hasHeader = hasHeader(table, parsedRows.get(0));
        // 如果有表头，就从第二行开始导入；如果没有表头，就从第一行开始导入。
        List<List<String>> dataRows = hasHeader ? parsedRows.subList(1, parsedRows.size()) : parsedRows;
        // 检查每一行的列数是否和数据库字段数量一致。
        validateRows(table, dataRows, hasHeader ? 2 : 1);

        // 批量执行 INSERT ... ON DUPLICATE KEY UPDATE，把 CSV 数据写入 MySQL。
        jdbcTemplate.batchUpdate(table.upsertSql(), dataRows, 100, this::fillStatement);

        // 返回导入结果。
        return Map.of(
                "table", table.name(),
                "inserted", dataRows.size(),
                "columns", table.columns()
        );
    }

    private boolean hasHeader(TableDefinition table, List<String> firstRow) {
        // 表头列数不一致，就认为没有表头。
        if (firstRow.size() != table.columns().size()) {
            return false;
        }
        for (int i = 0; i < table.columns().size(); i++) {
            // 逐列比较：CSV 表头必须和数据库字段名一致。
            if (!table.columns().get(i).equalsIgnoreCase(firstRow.get(i).trim())) {
                return false;
            }
        }
        return true;
    }

    private void validateRows(TableDefinition table, List<List<String>> rows, int startLineNumber) {
        for (int i = 0; i < rows.size(); i++) {
            // expected 是数据库表应有的列数，actual 是 CSV 当前行的列数。
            int expected = table.columns().size();
            int actual = rows.get(i).size();
            if (actual != expected) {
                // 列数不一致时，直接报错，避免错误数据写入数据库。
                throw new IllegalArgumentException("CSV第" + (startLineNumber + i) + "行列数错误：应为"
                        + expected + "列，实际为" + actual + "列");
            }
        }
    }

    private void validateAllColumns(TableDefinition table, Map<String, Object> row) {
        if (row == null) {
            throw new IllegalArgumentException("新增记录不能为空");
        }
        for (String column : table.columns()) {
            validateRequiredValue(row.get(column), column);
        }
    }

    private void validateEditableColumns(TableDefinition table, Map<String, Object> row) {
        if (row == null) {
            throw new IllegalArgumentException("修改记录不能为空");
        }
        for (String column : table.editableColumns()) {
            validateRequiredValue(row.get(column), column);
        }
    }

    private void validatePrimaryKey(String id, String primaryKey) {
        validateRequiredValue(id, primaryKey);
    }

    private void validateRequiredValue(Object value, String column) {
        if (value == null || value.toString().trim().isEmpty()) {
            throw new IllegalArgumentException("字段 " + column + " 不能为空");
        }
    }

    private Object normalizeValue(Object value) {
        return value == null ? "" : value.toString().trim();
    }

    private void fillStatement(PreparedStatement statement, List<String> row) throws SQLException {
        for (int i = 0; i < row.size(); i++) {
            // PreparedStatement 的参数从 1 开始，所以这里用 i + 1。
            statement.setString(i + 1, row.get(i));
        }
    }
}