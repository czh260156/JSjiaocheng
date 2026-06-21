/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if (!matrix || matrix.length === 0) return false;

    const m = matrix.length;    // 行数
    const n = matrix[0].length; // 列数

    let left = 0;
    let right = m * n - 1; // 视为一维数组的左右边界

    while (left <= right) {
        // 计算中间索引，防止溢出的写法
        let mid = Math.floor((left + right) / 2);
        
        // 将一维索引 mid 转换为矩阵的坐标 [row, col]
        let row = Math.floor(mid / n);
        let col = mid % n;
        let midVal = matrix[row][col];

        if (midVal === target) {
            return true; // 找到了
        } else if (midVal < target) {
            left = mid + 1; // 目标在右半部分
        } else {
            right = mid - 1; // 目标在左半部分
        }
    }

    return false; // 遍历完未找到
};