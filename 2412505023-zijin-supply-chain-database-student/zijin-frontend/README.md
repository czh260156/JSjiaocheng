# Zijin Frontend

这是已经提供好的 Vue 3 + Vite 前端页面。

学生不需要编写前端代码。后端完成后，只需要启动前端，页面会通过 `/api` 请求访问 Spring Boot 后端。

## 运行端口

```text
前端：http://localhost:5173
后端：http://localhost:8080
```

## 前后端连接方式

前端代码中使用：

```js
fetch('/api/...')
```

`vite.config.js` 已经配置代理：

```js
proxy: {
  '/api': 'http://localhost:8080',
}
```

所以访问流程是：

```text
前端页面 -> /api 请求 -> Spring Boot 后端 -> MySQL 数据库
```
