var uniquePaths = function(m, n) {
    let cur = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // cur[j] 代表上方格子，cur[j-1] 代表左方格子
            cur[j] += cur[j - 1];
        }
    }
    return cur[n - 1];
};