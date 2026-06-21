/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let firstRowHasZero = false;
    let firstColHasZero = false;

    // 1. 检查第一列是否有 0
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColHasZero = true;
            break;
        }
    }

    // 2. 检查第一行是否有 0
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowHasZero = true;
            break;
        }
    }

    // 3. 使用第一行和第一列记录其他位置的 0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // 4. 根据第一行和第一列的标记，将对应的元素置 0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // 5. 最后处理第一行和第一列
    if (firstRowHasZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    if (firstColHasZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};