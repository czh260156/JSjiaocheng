/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const h = board.length;
    const w = board[0].length;
    
    // 方向数组：上、下、左、右
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const backtrack = (r, c, k) => {
        // 如果当前格子字符不匹配，直接返回 false
        if (board[r][c] !== word[k]) {
            return false;
        }
        
        // 如果已经匹配到单词的最后一个字符，返回 true
        if (k === word.length - 1) {
            return true;
        }

        // 标记当前格子已被访问（回溯常用技巧：原地修改）
        const temp = board[r][c];
        board[r][c] = '#';

        // 向四个方向递归探索
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            // 检查边界并递归
            if (nr >= 0 && nr < h && nc >= 0 && nc < w) {
                if (backtrack(nr, nc, k + 1)) {
                    return true; // 只要有一条路径通，就返回 true
                }
            }
        }

        // 撤销标记（回溯：还原现场）
        board[r][c] = temp;
        return false;
    };

    // 遍历每一个格子作为起点
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (backtrack(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
};