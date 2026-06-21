/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const result = [];
    const n = nums.length;
    if (n < 4) return result;

    // 1. 排序
    nums.sort((a, b) => a - b);

    // 2. 第一层循环固定第一个数
    for (let i = 0; i < n - 3; i++) {
        // 去重
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // 剪枝优化
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
        if (nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) continue;

        // 3. 第二层循环固定第二个数
        for (let j = i + 1; j < n - 2; j++) {
            // 去重
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            // 剪枝优化
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
            if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) continue;

            // 4. 双指针寻找剩余两个数
            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    // 找到后继续移动指针并去重
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
};