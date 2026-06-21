/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // 使用二维数组记录状态：[维度][数字-1]
    // 例如 rows[0][4] = true 表示第0行出现了数字5
    let rows = Array.from({ length: 9 }, () => new Array(9).fill(false));
    let cols = Array.from({ length: 9 }, () => new Array(9).fill(false));
    let boxes = Array.from({ length: 9 }, () => new Array(9).fill(false));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let char = board[i][j];
            
            // 跳过空格
            if (char === '.') continue;

            // 将字符转换为数字索引 (0-8)
            let num = char - '1';
            // 计算当前属于第几个九宫格
            let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            // 检查行、列、九宫格是否已经存在该数字
            if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
                return false;
            }

            // 标记该数字已出现
            rows[i][num] = true;
            cols[j][num] = true;
            boxes[boxIndex][num] = true;
        }
    }

    return true;
};