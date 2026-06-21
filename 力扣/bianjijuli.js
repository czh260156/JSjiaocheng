/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // 创建 (m+1) x (n+1) 的二维数组
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // 初始化边界：第一行和第一列
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i; // word2 为空，word1 需要全部删除
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j; // word1 为空，word2 需要全部插入
    }

    // 填充 DP 表
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // 字符相等，直接继承左上方的值
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // 字符不等，取 (替换, 插入, 删除) 三者的最小值 + 1
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j - 1], // 替换
                    dp[i][j - 1],     // 插入
                    dp[i - 1][j]      // 删除
                );
            }
        }
    }

    return dp[m][n];
};