/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    // 1. 排序
    nums.sort((a, b) => a - b);
    let n = nums.length;
    // 初始化最接近的和为前三位之和
    let closestSum = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < n - 2; i++) {
        let left = i + 1;
        let right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            // 如果和正好等于目标值，直接返回
            if (sum === target) return sum;

            // 如果当前和比记录的和更接近目标，则更新
            if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
                closestSum = sum;
            }

            // 根据 sum 与 target 的大小关系移动指针
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return closestSum;
};