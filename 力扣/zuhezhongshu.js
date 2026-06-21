/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const res = [];
    // 1. 排序：这是剪枝的前提，能显著提升效率
    candidates.sort((a, b) => a - b);

    /**
     * 回溯函数
     * @param {number} remain 剩余目标值
     * @param {number[]} path 当前路径（组合）
     * @param {number} start 下一次开始搜索的索引
     */
    const backtrack = (remain, path, start) => {
        // 终止条件：找到一组解
        if (remain === 0) {
            res.push([...path]); // 放入 path 的副本
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // 2. 剪枝：如果当前值已经大于剩余值，后面的都不用试了
            if (candidates[i] > remain) break;

            // 做选择
            path.push(candidates[i]);
            
            // 3. 递归：由于可以无限次使用当前数字，所以下一个 start 依然是 i
            backtrack(remain - candidates[i], path, i);
            
            // 撤销选择（回溯）
            path.pop();
        }
    };

    backtrack(target, [], 0);
    return res;
};