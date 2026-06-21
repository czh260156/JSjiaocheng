/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // 1. 初始化第一行（每个格子只能从左边过来）
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }

    // 2. 初始化第一列（每个格子只能从上面过来）
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }

    // 3. 填充剩余格子
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 当前格子的值 = 原值 + Math.min(左边路径和, 上边路径和)
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }

    // 4. 返回右下角的值
    return grid[m - 1][n - 1];
};