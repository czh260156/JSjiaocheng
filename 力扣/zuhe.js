/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const res = []; // 存储所有结果
    const path = []; // 存储当前路径上的组合

    const backtrack = (start) => {
        // 结束条件：如果当前组合长度达到了 k
        if (path.length === k) {
            res.push([...path]); // 放入结果集（深拷贝）
            return;
        }

        /**
         * 剪枝优化点：
         * i 表示当前尝试的数字。
         * 我们还需要选 k - path.length 个数。
         * 如果从 i 到 n 的数字个数小于需要的个数，就没必要继续循环了。
         * 循环上限可以优化为：i <= n - (k - path.length) + 1
         */
        for (let i = start; i <= n - (k - path.length) + 1; i++) {
            // 做出选择
            path.push(i);
            // 递归进入下一层，从 i + 1 开始，避免重复选择
            backtrack(i + 1);
            // 撤销选择（回溯）
            path.pop();
        }
    };

    backtrack(1); // 从数字 1 开始搜索
    return res;
};