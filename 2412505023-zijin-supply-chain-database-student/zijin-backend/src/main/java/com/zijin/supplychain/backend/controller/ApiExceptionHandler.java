package com.zijin.supplychain.backend.controller;

// DataAccessException 表示数据库访问异常，例如密码错误、SQL 执行失败。
import org.springframework.dao.DataAccessException;
// HttpStatus 用来指定接口返回的 HTTP 状态码。
import org.springframework.http.HttpStatus;
// ExceptionHandler 用来声明这个方法处理哪一类异常。
import org.springframework.web.bind.annotation.ExceptionHandler;
// ResponseStatus 用来指定异常发生时返回的状态码。
import org.springframework.web.bind.annotation.ResponseStatus;
// RestControllerAdvice 表示这是全局接口异常处理类。
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

// 统一处理 Controller 抛出的异常，让错误信息以 JSON 返回。
@RestControllerAdvice
public class ApiExceptionHandler {

    // 处理参数错误，例如表名不支持、CSV 列数不对。
    @ExceptionHandler(IllegalArgumentException.class)
    // BAD_REQUEST 对应 HTTP 400，表示请求内容有问题。
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleBadRequest(IllegalArgumentException exception) {
        return Map.of("error", exception.getMessage());
    }

    // 处理数据库错误，例如 MySQL 密码错误、数据库未启动、SQL 执行失败。
    @ExceptionHandler(DataAccessException.class)
    // INTERNAL_SERVER_ERROR 对应 HTTP 500，表示后端或数据库执行失败。
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleDatabaseError(DataAccessException exception) {
        return Map.of("error", "数据库操作失败：" + rootMessage(exception));
    }

    // 兜底处理其他没有单独声明的异常。
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleUnknownError(Exception exception) {
        return Map.of("error", "后端服务异常：" + exception.getMessage());
    }

    private String rootMessage(Throwable throwable) {
        // 找到最底层异常信息，通常最接近真正原因。
        Throwable current = throwable;
        while (current.getCause() != null) {
            current = current.getCause();
        }
        return current.getMessage();
    }
}