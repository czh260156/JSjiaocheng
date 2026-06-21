/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        // 使用 Math.floor 防止结果为小数
        // (left + right) >> 1 也是一种常见的写法（位运算取整）
        let mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) {
            // 找到了，直接返回索引
            return mid;
        } else if (nums[mid] < target) {
            // 目标值在右半部分
            left = mid + 1;
        } else {
            // 目标值在左半部分
            right = mid - 1;
        }
    }

    // 循环结束如果没有找到，left 即为插入位置
    return left;
};