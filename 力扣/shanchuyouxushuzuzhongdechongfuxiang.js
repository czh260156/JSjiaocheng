/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // 边界情况处理
    if (nums.length === 0) return 0;

    // slow 指针表示唯一元素应该存放的位置
    let slow = 0;

    // fast 指针用于扫描数组
    for (let fast = 1; fast < nums.length; fast++) {
        // 如果快指针发现了一个与当前唯一元素不同的新值
        if (nums[fast] !== nums[slow]) {
            // 慢指针前移一位
            slow++;
            // 将新值覆盖到慢指针位置
            nums[slow] = nums[fast];
        }
    }

    // 唯一元素的数量是 索引+1
    return slow + 1;
};