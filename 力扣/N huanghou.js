/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const res = [];
    // 初始化棋盘，全填 '.'
    const board = Array.from({ length: n }, () => new Array(n).fill('.'));

    // 用于记录哪些列、对角线被占用了
    const cols = new Set();          // 记录列
    const diag1 = new Set();         // 记录捺对角线 (row - col)
    const diag2 = new Set();         // 记录撇对角线 (row + col)

    /**
     * 回溯函数
     * @param {number} row 当前正在放置第几行的皇后
     */
    const backtrack = (row) => {
        // 终止条件：如果已经放完了最后一行，说明找到了一组解
        if (row === n) {
            res.push(board.map(r => r.join('')));
            return;
        }

        // 在当前行的每一列尝试放置
        for (let col = 0; col < n; col++) {
            // 检查冲突
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            // --- 做选择 ---
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // --- 递归进入下一行 ---
            backtrack(row + 1);

            // --- 撤销选择 (回溯) ---
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    };

    backtrack(0);
    return res;
};