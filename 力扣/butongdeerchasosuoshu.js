/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    // dp[i] 表示 i 个节点能组成的不同二叉搜索树的数量
    const dp = new Array(n + 1).fill(0);

    // 基础情况
    dp[0] = 1; // 空树也是一种情况
    dp[1] = 1; // 只有一个节点

    // 从 2 个节点开始计算直到 n
    for (let i = 2; i <= n; i++) {
        // 尝试以 j 为根节点
        for (let j = 1; j <= i; j++) {
            // 左边有 j-1 个节点，右边有 i-j 个节点
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }

    return dp[n];
};