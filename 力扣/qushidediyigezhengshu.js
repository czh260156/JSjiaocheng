/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        // 使用 while 循环进行连续置换
        // 条件：
        // 1. nums[i] 在 [1, n] 范围内
        // 2. nums[i] 应该在的位置 nums[i]-1 上的数不是 nums[i]
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            // 交换 nums[i] 到它该去的地方
            let targetIdx = nums[i] - 1;
            [nums[i], nums[targetIdx]] = [nums[targetIdx], nums[i]];
        }
    }

    // 第二次遍历，寻找第一个位置不对的数
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    // 如果 1 到 n 都在正确位置，则缺失的是 n + 1
    return n + 1;
};