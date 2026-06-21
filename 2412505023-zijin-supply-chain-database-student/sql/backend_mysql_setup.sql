-- 创建数据库；如果数据库已经存在，就不会重复创建。
CREATE DATABASE IF NOT EXISTS zijin_supply_chain
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;

-- 切换到本项目数据库，后面的建表语句都会在这个库里执行。
USE zijin_supply_chain;

-- 先删除旧表，方便反复运行脚本重新初始化。
-- 先删 transportation，因为它逻辑上依赖 orders。
DROP TABLE IF EXISTS transportation;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS orders;

-- 创建订单表：保存销售订单数据。
CREATE TABLE orders (
    order_id         VARCHAR(20)    NOT NULL COMMENT '订单编号',
    order_date       DATE           NOT NULL COMMENT '下单日期',
    customer_id      VARCHAR(20)    NOT NULL COMMENT '客户编号',
    product_category VARCHAR(20)    NOT NULL COMMENT '产品类别',
    quantity_tons    DECIMAL(10,2)  NOT NULL COMMENT '数量(吨)',
    unit_price       DECIMAL(12,2)  NOT NULL COMMENT '单价(元/吨)',
    total_amount     DECIMAL(15,2)  NOT NULL COMMENT '总金额(元)',
    region           VARCHAR(10)    NOT NULL COMMENT '销售区域',
    status           VARCHAR(10)    NOT NULL DEFAULT '进行中' COMMENT '订单状态',
    -- 主键：每个订单编号只能出现一次。
    PRIMARY KEY (order_id),
    -- 索引：提高按日期、区域、产品类别查询的速度。
    INDEX idx_orders_date (order_date),
    INDEX idx_orders_region (region),
    INDEX idx_orders_category (product_category)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci
  COMMENT='订单表';

-- 创建库存表：保存仓库库存数据。
CREATE TABLE inventory (
    record_id           VARCHAR(20)    NOT NULL COMMENT '库存记录编号',
    record_date         DATE           NOT NULL COMMENT '记录日期',
    warehouse_id        VARCHAR(10)    NOT NULL COMMENT '仓库编号',
    warehouse_location  VARCHAR(30)    NOT NULL COMMENT '仓库所在地',
    product_category    VARCHAR(20)    NOT NULL COMMENT '产品类别',
    stock_quantity_tons DECIMAL(10,2)  NOT NULL COMMENT '库存量(吨)',
    min_stock_tons      DECIMAL(10,2)  NOT NULL COMMENT '最低库存阈值(吨)',
    max_capacity_tons   DECIMAL(10,2)  NOT NULL COMMENT '最大容量(吨)',
    -- 主键：每条库存记录只能出现一次。
    PRIMARY KEY (record_id),
    -- 索引：提高按日期、仓库、产品类别查询的速度。
    INDEX idx_inventory_date (record_date),
    INDEX idx_inventory_warehouse (warehouse_id),
    INDEX idx_inventory_category (product_category)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci
  COMMENT='库存表';

-- 创建运输表：保存订单运输数据。
CREATE TABLE transportation (
    transport_id   VARCHAR(20)    NOT NULL COMMENT '运输单号',
    order_id       VARCHAR(20)    NOT NULL COMMENT '关联订单编号',
    origin         VARCHAR(30)    NOT NULL COMMENT '出发地',
    destination    VARCHAR(30)    NOT NULL COMMENT '目的地',
    transport_mode VARCHAR(10)    NOT NULL COMMENT '运输方式',
    distance_km    DECIMAL(8,1)   NOT NULL COMMENT '距离(公里)',
    planned_days   INT            NOT NULL COMMENT '计划天数',
    actual_days    INT            NOT NULL COMMENT '实际天数',
    transport_cost DECIMAL(12,2)  NOT NULL COMMENT '运输费用(元)',
    status         VARCHAR(10)    NOT NULL DEFAULT '运输中' COMMENT '运输状态',
    -- 主键：每个运输单号只能出现一次。
    PRIMARY KEY (transport_id),
    -- 索引：提高按订单、运输方式、运输状态查询的速度。
    INDEX idx_transport_order (order_id),
    INDEX idx_transport_mode (transport_mode),
    INDEX idx_transport_status (status)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci
  COMMENT='运输表';

-- 查看当前数据库里是否已经有三张表。
SHOW TABLES;

-- 查看三张表当前分别有多少行数据。
SELECT 'orders' AS table_name, COUNT(*) AS row_count FROM orders
UNION ALL
SELECT 'inventory', COUNT(*) FROM inventory
UNION ALL
SELECT 'transportation', COUNT(*) FROM transportation;
```