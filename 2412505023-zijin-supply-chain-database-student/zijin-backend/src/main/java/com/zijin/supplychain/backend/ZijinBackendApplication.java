package com.zijin.supplychain.backend;

// SpringApplication 用来启动 Spring Boot 后端程序。
import org.springframework.boot.SpringApplication;
// SpringBootApplication 标记当前类是后端启动类。
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 启动类注解：Spring Boot 会从这个类所在的包开始扫描 controller、service、table 等子包。
@SpringBootApplication
public class ZijinBackendApplication {

    public static void main(String[] args) {
        // 启动 Spring Boot 项目，启动成功后后端会监听 application.properties 里配置的端口。
        SpringApplication.run(ZijinBackendApplication.class, args);
    }
}