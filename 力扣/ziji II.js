/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const res = [];
    // 1. 先排序，这是去重的前提
    nums.sort((a, b) => a - b);

    const backtrack = (start, path) => {
        // 2. 每一个路径都是一个子集，直接存入结果
        res.push([...path]);

        for (let i = start; i < nums.length; i++) {
            // 3. 去重剪枝：
            // 如果当前元素和前一个元素相同，且前一个元素在同一层已经被用过了，就跳过
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            }

            // 4. 选择当前元素
            path.push(nums[i]);
            // 5. 递归进入下一层，从 i + 1 开始，避免重复选取同一个位置的元素
            backtrack(i + 1, path);
            // 6. 回溯：撤销选择
            path.pop();
        }
    };

    backtrack(0, []);
    return res;
};