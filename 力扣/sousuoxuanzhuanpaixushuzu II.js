/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) return true;

        // 处理重复元素的关键：无法判断有序区间，直接缩小边界
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
            continue;
        }

        // 判断左半部分是否有序
        if (nums[left] <= nums[mid]) {
            // target 在左半部分有序区间内
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } 
        // 右半部分是否有序
        else {
            // target 在右半部分有序区间内
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return false;
};