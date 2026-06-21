/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let result = "1"; // 第 1 个序列

    // 从第 2 个开始生成，直到第 n 个
    for (let i = 2; i <= n; i++) {
        let nextResult = "";
        let count = 1;

        // 遍历当前的 result 字符串
        for (let j = 0; j < result.length; j++) {
            // 如果当前字符和下一个字符相同，计数加 1
            if (result[j] === result[j + 1]) {
                count++;
            } else {
                // 否则，描述当前的字符（次数 + 字符本身）
                nextResult += count.toString() + result[j];
                // 重置计数
                count = 1;
            }
        }
        // 更新 result 为新生成的描述字符串
        result = nextResult;
    }

    return result;
};