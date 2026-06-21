var isInterleave = function(s1, s2, s3) {
    const n = s1.length, m = s2.length;
    if (n + m !== s3.length) return false;

    const dp = new Array(m + 1).fill(false);
    dp[0] = true;

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i > 0) {
                dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1];
            }
            if (j > 0) {
                dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
    }
    return dp[m];
};