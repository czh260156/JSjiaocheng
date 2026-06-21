/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // 1. 初始化一个 n x n 的二维数组
    const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
    
    let num = 1; // 当前要填入的数字
    let top = 0, bottom = n - 1;
    let left = 0, right = n - 1;

    while (num <= n * n) {
        // 从左向右填充上边界
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;

        // 从上向下填充右边界
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        // 从右向左填充下边界
        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = num++;
        }
        bottom--;

        // 从下向上填充左边界
        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = num++;
        }
        left++;
    }

    return matrix;
};