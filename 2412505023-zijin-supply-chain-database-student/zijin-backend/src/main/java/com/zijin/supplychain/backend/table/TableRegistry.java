package com.zijin.supplychain.backend.table;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

// 交给 Spring 管理，后面的 TableService 可以直接使用它。
@Component
public class TableRegistry {

    // 表名白名单：后端只允许操作这里登记过的三张表。
    private final Map<String, TableDefinition> tables = Map.of(
            // 订单表：最后一个参数 order_id 表示主键。
            "orders", new TableDefinition("orders", List.of(
                    "order_id", "order_date", "customer_id", "product_category",
                    "quantity_tons", "unit_price", "total_amount", "region", "status"
            ), "order_id"),
            // 库存表：最后一个参数 record_id 表示主键。
            "inventory", new TableDefinition("inventory", List.of(
                    "record_id", "record_date", "warehouse_id", "warehouse_location",
                    "product_category", "stock_quantity_tons", "min_stock_tons", "max_capacity_tons"
            ), "record_id"),
            // 运输表：最后一个参数 transport_id 表示主键。
            "transportation", new TableDefinition("transportation", List.of(
                    "transport_id", "order_id", "origin", "destination", "transport_mode",
                    "distance_km", "planned_days", "actual_days", "transport_cost", "status"
            ), "transport_id")
    );

    public TableDefinition require(String tableName) {
        // 按表名查找表定义，找不到就拒绝操作。
        TableDefinition table = tables.get(tableName);
        if (table == null) {
            throw new IllegalArgumentException("不支持的数据表：" + tableName + "，可选值：" + tables.keySet());
        }
        return table;
    }

    public List<String> names() {
        // 返回当前后端支持的数据表名称，供 /api/tables 接口使用。
        return tables.keySet().stream().sorted().toList();
    }
}