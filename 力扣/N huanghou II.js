var totalNQueens = function(n) {
    let count = 0;
    // fullMask 是一个低 n 位全是 1 的整数，用于限定范围
    const fullMask = (1 << n) - 1;

    /**
     * @param {number} row 当前行
     * @param {number} cols 列限制
     * @param {number} ld 左对角线限制
     * @param {number} rd 右对角线限制
     */
    const solve = (row, cols, ld, rd) => {
        if (row === n) {
            count++;
            return;
        }

        // 找出所有可以放置皇后的位置（0 表示可选）
        // (cols | ld | rd) 得到所有被占用的位
        // 取反并与 fullMask 做与运算，得到所有可选的位（1 表示可选）
        let pos = fullMask & (~(cols | ld | rd));

        while (pos > 0) {
            // 取出最右边的 1（即尝试在这一列放皇后）
            let p = pos & -pos;
            
            // 递归下一行：
            // 列限制直接或上 p
            // 左对角线限制：(ld | p) 左移一位
            // 右对角线限制：(rd | p) 右移一位
            solve(row + 1, cols | p, (ld | p) << 1, (rd | p) >> 1);
            
            // 将刚试过的位置从可选位中移除（回溯）
            pos -= p;
        }
    };

    solve(0, 0, 0, 0);
    return count;
};