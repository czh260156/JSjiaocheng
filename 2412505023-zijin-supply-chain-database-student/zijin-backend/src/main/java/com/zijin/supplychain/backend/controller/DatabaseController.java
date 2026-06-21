package com.zijin.supplychain.backend.controller;

import com.zijin.supplychain.backend.service.TableService;
// DeleteMapping 用来声明 DELETE 请求接口。
import org.springframework.web.bind.annotation.DeleteMapping;
// GetMapping 用来声明 GET 请求接口。
import org.springframework.web.bind.annotation.GetMapping;
// PathVariable 用来接收路径里的参数，例如 /api/orders/count 里的 orders。
import org.springframework.web.bind.annotation.PathVariable;
// PostMapping 用来声明 POST 请求接口。
import org.springframework.web.bind.annotation.PostMapping;
// PutMapping 用来声明 PUT 请求接口。
import org.springframework.web.bind.annotation.PutMapping;
// RequestBody 用来接收请求体内容，这里接收上传的 CSV 文本。
import org.springframework.web.bind.annotation.RequestBody;
// RequestMapping 用来给整个 Controller 设置公共路径。
import org.springframework.web.bind.annotation.RequestMapping;
// RequestParam 用来接收 URL 查询参数，例如 ?limit=10。
import org.springframework.web.bind.annotation.RequestParam;
// RestController 表示这个类提供 REST 接口，返回值会自动转成 JSON。
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// 数据库接口层：接收请求，然后调用 TableService 处理业务。
@RestController
// 这个 Controller 里的接口都以 /api 开头。
@RequestMapping("/api")
public class DatabaseController {

    // Controller 不直接操作数据库，而是调用业务层 TableService。
    private final TableService tableService;

    public DatabaseController(TableService tableService) {
        // 构造方法注入：Spring Boot 自动传入 TableService 对象。
        this.tableService = tableService;
    }

    // GET /api/tables：查询后端支持哪些数据表。
    @GetMapping("/tables")
    public Map<String, Object> tables() {
        return Map.of("tables", tableService.tableNames());
    }

    // GET /api/{table}/count：查询某张表的记录数。
    // 例子：GET /api/orders/count，其中 table = orders。
    @GetMapping("/{table}/count")
    public Map<String, Object> count(@PathVariable String table) {
        return tableService.count(table);
    }

    // GET /api/{table}/list?limit=10：查询某张表前几行数据。
    // @RequestParam(defaultValue = "10") 表示不传 limit 时默认查 10 行。
    @GetMapping("/{table}/list")
    public Map<String, Object> list(@PathVariable String table,
                                    @RequestParam(defaultValue = "10") int limit) {
        return tableService.list(table, limit);
    }

    // POST /api/import/{table}：把 CSV 文本导入指定表。
    // 例子：POST /api/import/orders，请求体里放 orders.csv 的内容。
    @PostMapping("/import/{table}")
    public Map<String, Object> importCsv(@PathVariable String table,
                                         @RequestBody(required = false) String csvText) {
        return tableService.importCsv(table, csvText);
    }

    // POST /api/{table}/row：新增一条记录。
    // 请求体是 JSON，例如 {"order_id":"O9999","order_date":"2026-06-06",...}。
    @PostMapping("/{table}/row")
    public Map<String, Object> createRow(@PathVariable String table,
                                         @RequestBody Map<String, Object> row) {
        return tableService.createRow(table, row);
    }

    // PUT /api/{table}/row/{id}：按主键修改一条记录。
    // id 是路径里的主键值，例如 /api/orders/row/O9999。
    @PutMapping("/{table}/row/{id}")
    public Map<String, Object> updateRow(@PathVariable String table,
                                         @PathVariable String id,
                                         @RequestBody Map<String, Object> row) {
        return tableService.updateRow(table, id, row);
    }

    // DELETE /api/{table}/row/{id}：按主键删除一条记录。
    @DeleteMapping("/{table}/row/{id}")
    public Map<String, Object> deleteRow(@PathVariable String table,
                                         @PathVariable String id) {
        return tableService.deleteRow(table, id);
    }
}