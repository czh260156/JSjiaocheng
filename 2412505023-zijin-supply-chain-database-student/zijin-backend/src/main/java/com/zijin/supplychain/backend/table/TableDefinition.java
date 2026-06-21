package com.zijin.supplychain.backend.table;

// 用来生成重复数量的 ? 占位符。
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

// TableDefinition 用来描述一张表：表名、字段列表、主键字段。
public record TableDefinition(String name, List<String> columns, String primaryKey) {

    public String countSql() {
        // 生成统计记录数的 SQL，例如：SELECT COUNT(*) FROM `orders`
        return "SELECT COUNT(*) FROM " + quote(name);
    }

    public String listSql() {
        // 生成查询列表的 SQL，LIMIT ? 里的 ? 后面由 JdbcTemplate 填入。
        return "SELECT " + quotedColumns() + " FROM " + quote(name)
                + " ORDER BY " + quote(primaryKey) + " LIMIT ?";
    }

    public String upsertSql() {
        // 根据字段数量生成同样数量的 ?，用于 PreparedStatement 填值。
        String placeholders = String.join(", ", Collections.nCopies(columns.size(), "?"));

        // 主键字段不更新，其他字段在主键重复时更新。
        String updateColumns = columns.stream()
                .filter(column -> !column.equals(primaryKey))
                .map(column -> quote(column) + " = VALUES(" + quote(column) + ")")
                .collect(Collectors.joining(", "));

        // 生成插入或更新 SQL：主键不存在就插入，主键已存在就更新。
        return "INSERT INTO " + quote(name) + " (" + quotedColumns() + ") VALUES ("
                + placeholders + ") ON DUPLICATE KEY UPDATE " + updateColumns;
    }

    public String insertSql() {
        // 单条新增时使用普通 INSERT，主键重复时让数据库直接报错。
        String placeholders = String.join(", ", Collections.nCopies(columns.size(), "?"));
        return "INSERT INTO " + quote(name) + " (" + quotedColumns() + ") VALUES (" + placeholders + ")";
    }

    public String updateSql() {
        // 修改时不允许改主键，只修改主键以外的字段。
        String assignments = columns.stream()
                .filter(column -> !column.equals(primaryKey))
                .map(column -> quote(column) + " = ?")
                .collect(Collectors.joining(", "));

        return "UPDATE " + quote(name) + " SET " + assignments
                + " WHERE " + quote(primaryKey) + " = ?";
    }

    public String deleteSql() {
        // 按主键删除一条记录。
        return "DELETE FROM " + quote(name) + " WHERE " + quote(primaryKey) + " = ?";
    }

    public List<String> editableColumns() {
        // 主键以外的字段可以在编辑时修改。
        return columns.stream()
                .filter(column -> !column.equals(primaryKey))
                .toList();
    }

    private String quotedColumns() {
        // 把字段列表转成带反引号的 SQL 字段，例如：`order_id`, `order_date`。
        return columns.stream().map(TableDefinition::quote).collect(Collectors.joining(", "));
    }

    private static String quote(String identifier) {
        // MySQL 里用反引号包住表名和字段名，避免字段名和关键字冲突。
        return "`" + identifier + "`";
    }
}