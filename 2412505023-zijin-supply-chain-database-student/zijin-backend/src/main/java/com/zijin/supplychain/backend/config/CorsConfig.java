package com.zijin.supplychain.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 后端接口跨域配置类。
// 当前端页面从 localhost:5173 访问后端 localhost:8080 时，浏览器会检查跨域权限。
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // 允许本项目 Vue 前端开发服务器访问后端。
                .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173")
                // 允许前端发送查询、新增、修改、删除、导入和浏览器预检请求。
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // 允许前端携带普通请求头，例如 Content-Type。
                .allowedHeaders("*");
    }
}