/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    // 如果起点或终点有障碍物，直接返回 0
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }

    // 创建一个长度为 n 的数组，并初始化为 0
    const dp = new Array(n).fill(0);

    // 初始化起点
    dp[0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前格子是障碍物
            if (obstacleGrid[i][j] === 1) {
                dp[j] = 0; // 该位置路径数归零
            } else if (j > 0) {
                // 如果不是障碍物，路径数 = 上方格子路径数 (当前的 dp[j]) + 左方格子路径数 (dp[j-1])
                // 注意：当 j=0 时，dp[0] 保持不变（代表只从上方下来）
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n - 1];
};