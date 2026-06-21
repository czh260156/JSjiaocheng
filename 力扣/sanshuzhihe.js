/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let res = [];
    const n = nums.length;
    if (n < 3) return res;

    // 1. 排序：方便使用双指针和去重
    nums.sort((a, b) => a - b);

    for (let i = 0; i < n - 2; i++) {
        // 优化：如果当前数已经大于0，后面由于是有序的，三数之和必大于0，直接结束
        if (nums[i] > 0) break;

        // 2. 对第一个数去重：如果和前一个数一样，就跳过
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                
                // 3. 对左指针和右指针去重
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                // 找到一组解并去重后，移动指针继续寻找
                left++;
                right--;
            } else if (sum < 0) {
                // 和太小，左指针右移寻求更大的数
                left++;
            } else {
                // 和太大，右指针左移寻求更小的数
                right--;
            }
        }
    }

    return res;
};