/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const res = [];
    // 1. 排序是去重的关键基础
    nums.sort((a, b) => a - b);
    const used = new Array(nums.length).fill(false);

    const backtrack = (path) => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // 如果当前位置的数已经用过了，跳过
            if (used[i]) continue;

            // 2. 核心去重逻辑（剪枝）
            // i > 0 && nums[i] === nums[i-1]: 发现重复数字
            // !used[i-1]: 说明前一个相同的数字在当前层已经被“回溯”过了
            // 如果不跳过，就会在当前位置再次开启一个一模一样的搜索分支
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }

            // 做选择
            used[i] = true;
            path.push(nums[i]);
            
            backtrack(path);

            // 撤销选择（回溯）
            path.pop();
            used[i] = false;
        }
    };

    backtrack([]);
    return res;
};