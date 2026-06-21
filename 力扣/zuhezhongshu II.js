/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const res = [];
    // 1. 排序是去重和剪枝的前提
    candidates.sort((a, b) => a - b);

    const backtrack = (remain, path, start) => {
        if (remain === 0) {
            res.push([...path]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // 2. 剪枝：剩余值小于当前值，直接结束当前层循环
            if (remain < candidates[i]) break;

            // 3. 去重：同一层级内，如果当前数字和前一个数字相同，跳过
            // i > start 保证了我们跳过的是“同层重复”，而不是“路径重复”
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }

            // 做选择
            path.push(candidates[i]);
            
            // 4. 递归：传入 i + 1，保证每个元素只用一次
            backtrack(remain - candidates[i], path, i + 1);
            
            // 撤销选择（回溯）
            path.pop();
        }
    };

    backtrack(target, [], 0);
    return res;
};