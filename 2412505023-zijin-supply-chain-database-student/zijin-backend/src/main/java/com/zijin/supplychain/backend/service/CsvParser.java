package com.zijin.supplychain.backend.service;

import java.util.ArrayList;
import java.util.List;

// 简单 CSV 解析工具，把上传的 CSV 文本拆成二维列表。
// 例如：
// order_id,order_date,status
// O001,2026-06-01,已完成
// 会被解析成：[[order_id, order_date, status], [O001, 2026-06-01, 已完成]]
public final class CsvParser {

    private CsvParser() {
        // 工具类不需要创建对象，所以把构造方法设为 private。
    }

    public static List<List<String>> parse(String csvText) {
        // parse 方法接收整份 CSV 文本，返回“多行多列”的结果。
        // 外层 List 表示多行，内层 List 表示一行里的多个字段。
        if (csvText == null || csvText.isBlank()) {
            // 没有上传内容时，返回空列表。
            return List.of();
        }

        // rows 保存最终解析出来的所有行。
        List<List<String>> rows = new ArrayList<>();
        // currentRow 保存当前正在解析的一行。
        List<String> currentRow = new ArrayList<>();
        // currentField 保存当前正在解析的一个字段。
        // 用 StringBuilder 是因为字段内容需要一个字符一个字符追加。
        StringBuilder currentField = new StringBuilder();
        // inQuotes 用来判断当前是否在双引号包住的字段里。
        // 如果在双引号里，逗号和换行就不能当成分隔符处理。
        boolean inQuotes = false;

        // 从头到尾逐个字符读取 CSV 文本。
        for (int i = 0; i < csvText.length(); i++) {
            // c 表示当前读到的字符。
            char c = csvText.charAt(i);

            if (inQuotes) {
                // 当前在双引号字段里，只需要关心两种情况：
                // 1. 遇到双引号，可能是字段结束，也可能是转义双引号。
                // 2. 遇到普通字符，直接加入当前字段。
                if (c == '"') {
                    if (i + 1 < csvText.length() && csvText.charAt(i + 1) == '"') {
                        // CSV 中两个连续双引号表示一个普通双引号字符。
                        // 例如字段内容是："紫金"矿业"，CSV 里会写成："紫金""矿业"
                        currentField.append('"');
                        // 下一个双引号已经被当成转义内容处理了，所以跳过它。
                        i++;
                    } else {
                        // 单独一个双引号表示引号字段结束。
                        inQuotes = false;
                    }
                } else {
                    // 在双引号字段里，逗号和换行都只是普通内容。
                    currentField.append(c);
                }
                // 引号内的字符处理完后，直接进入下一轮循环。
                continue;
            }

            if (c == '"') {
                // 遇到双引号，进入引号字段。
                // 进入后，直到下一个未转义的双引号才结束。
                inQuotes = true;
            } else if (c == ',') {
                // 逗号表示当前字段结束。
                // 例如：A,B 读到逗号时，A 就是一个完整字段。
                currentRow.add(cleanField(currentField));
                // 清空 currentField，准备读取下一个字段。
                currentField.setLength(0);
            } else if (c == '\r' || c == '\n') {
                // 换行表示当前行结束。
                if (c == '\r' && i + 1 < csvText.length() && csvText.charAt(i + 1) == '\n') {
                    // Windows 换行是 \r\n 两个字符，这里把 \n 跳过，避免重复结束一行。
                    i++;
                }
                // 把当前字段加入当前行，再把当前行加入 rows。
                finishRow(rows, currentRow, currentField);
            } else {
                // 普通字符，继续追加到当前字段。
                currentField.append(c);
            }
        }

        if (inQuotes) {
            // 文件结束时仍在引号里，说明 CSV 格式有问题。
            throw new IllegalArgumentException("CSV格式错误：存在未闭合的双引号");
        }

        if (currentField.length() > 0 || !currentRow.isEmpty()) {
            // 循环结束后，最后一行可能没有换行符，也要补充保存。
            finishRow(rows, currentRow, currentField);
        }

        if (!rows.isEmpty() && !rows.get(0).isEmpty()) {
            // 去掉 UTF-8 BOM，避免第一列表头变成异常字段名。
            // 有些 CSV 文件开头会带隐藏字符，导致 order_id 变成 \uFEFForder_id。
            rows.get(0).set(0, stripBom(rows.get(0).get(0)));
        }
        return rows;
    }

    private static void finishRow(List<List<String>> rows, List<String> currentRow, StringBuilder currentField) {
        // 先把当前字段加入当前行。
        currentRow.add(cleanField(currentField));
        // 清空字段缓存，准备下一行使用。
        currentField.setLength(0);
        if (currentRow.stream().anyMatch(value -> !value.isBlank())) {
            // 只保存有内容的行，空行直接跳过。
            // new ArrayList 是为了复制一份当前行，避免后面 clear 时把已保存的数据清掉。
            rows.add(new ArrayList<>(currentRow));
        }
        // 清空当前行，准备读取下一行。
        currentRow.clear();
    }

    private static String cleanField(StringBuilder field) {
        // trim 去掉字段前后的空格，避免 " orders " 这种内容影响匹配。
        return field.toString().trim();
    }

    private static String stripBom(String value) {
        // BOM 是部分 UTF-8 文件开头的隐藏字符。
        // 如果不去掉，第一列表头可能匹配不上数据库字段名。
        if (value != null && value.startsWith("\uFEFF")) {
            return value.substring(1);
        }
        return value;
    }
}