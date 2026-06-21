/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length;
    const n = p.length;
    
    // dp[i][j] 表示 s 的前 i 个字符与 p 的前 j 个字符是否匹配
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    
    // 基础情况：空字符串匹配
    dp[0][0] = true;
    
    // 初始化第一行：处理 s 为空，p 包含 '*' 的情况（如 a*b*）
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                // 情况 1: * 代表 0 个前面的元素，直接跳过模式中的 x*
                let matchZero = dp[i][j - 2];
                
                // 情况 2: * 代表 1 个或多个前面的元素
                // 需要 s[i-1] 能匹配 p[j-2]
                let canMatch = (s[i - 1] === p[j - 2] || p[j - 2] === '.');
                let matchMore = canMatch && dp[i - 1][j];
                
                dp[i][j] = matchZero || matchMore;
            } else {
                // 常规字符匹配（包括 '.'）
                if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
    }
    
    return dp[m][n];
};