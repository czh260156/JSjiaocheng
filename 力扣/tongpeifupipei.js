/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length;
    const n = p.length;

    // 创建 DP 表 (m+1) x (n+1)
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));

    // 初始化
    dp[0][0] = true;
    
    // 初始化第一行：处理模式 p 开头的 '*'
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    // 填表
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
                // 当前字符匹配或遇到 '?'
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                // 遇到 '*'，两种选其一：
                // dp[i][j-1]: '*' 不匹配任何字符
                // dp[i-1][j]: '*' 匹配至少一个字符（看 s 的前一位是否也匹配当前的 '*'）
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            }
        }
    }

    return dp[m][n];
};