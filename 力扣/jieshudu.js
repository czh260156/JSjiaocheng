/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    // 递归回溯函数
    const solve = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                // 找空格
                if (board[i][j] === '.') {
                    // 尝试填入 1-9
                    for (let num = 1; num <= 9; num++) {
                        let char = num.toString();
                        if (isValid(i, j, char)) {
                            board[i][j] = char; // 填入数字
                            
                            if (solve()) return true; // 如果后续也成功了，返回 true
                            
                            board[i][j] = '.'; // 回溯：如果后面走不通，擦掉重来
                        }
                    }
                    return false; // 1-9 都试过了不行，说明之前的填法有问题
                }
            }
        }
        return true; // 没有空格了，全部填完
    };

    // 校验函数：检查在 (row, col) 填入 char 是否合法
    const isValid = (row, col, char) => {
        for (let i = 0; i < 9; i++) {
            // 检查行
            if (board[row][i] === char) return false;
            // 检查列
            if (board[i][col] === char) return false;
            // 检查 3x3 九宫格
            let boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
            let boxCol = Math.floor(col / 3) * 3 + (i % 3);
            if (board[boxRow][boxCol] === char) return false;
        }
        return true;
    };

    solve();
};