/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let n = matrix.length;

    // 1. 转置矩阵
    for (let i = 0; i < n; i++) {
        // 注意 j 从 i 开始，只交换对角线一侧的元素，否则会交换两次变回原样
        for (let j = i; j < n; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // 2. 翻转每一行
    for (let i = 0; i < n; i++) {
        // 使用双指针翻转数组
        let left = 0;
        let right = n - 1;
        while (left < right) {
            let temp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = temp;
            left++;
            right--;
        }
    }
};