/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        // 取中间索引
        let mid = Math.floor((left + right) / 2);

        // 如果找到了直接返回
        if (nums[mid] === target) {
            return mid;
        }

        // 判断哪一段是有序的
        if (nums[left] <= nums[mid]) {
            // 左半段 [left, mid] 是有序的
            if (nums[left] <= target && target < nums[mid]) {
                // target 在左侧有序区间内
                right = mid - 1;
            } else {
                // target 在右侧区间
                left = mid + 1;
            }
        } else {
            // 右半段 [mid, right] 是有序的
            if (nums[mid] < target && target <= nums[right]) {
                // target 在右侧有序区间内
                left = mid + 1;
            } else {
                // target 在左侧区间
                right = mid - 1;
            }
        }
    }

    // 没找到返回 -1
    return -1;
};