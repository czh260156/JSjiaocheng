/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];
    const used = new Array(nums.length).fill(false); // 标记位

    /**
     * 回溯辅助函数
     * @param {number[]} path 当前已选取的排列路径
     */
    const backtrack = (path) => {
        // 结束条件：路径长度等于数组长度，说明找到了一个全排列
        if (path.length === nums.length) {
            res.push([...path]); // 存入 path 的副本
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // 如果这个数已经用过了，跳过
            if (used[i]) continue;

            // --- 做选择 ---
            path.push(nums[i]);
            used[i] = true;

            // --- 递归进入下一层 ---
            backtrack(path);

            // --- 撤销选择 (回溯) ---
            path.pop();
            used[i] = false;
        }
    };

    backtrack([]);
    return res;
};