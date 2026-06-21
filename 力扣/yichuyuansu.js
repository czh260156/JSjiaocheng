/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // k 指针用于指向存放下一个非 val 元素的位置
    let k = 0;

    // 遍历整个数组
    for (let i = 0; i < nums.length; i++) {
        // 如果当前元素不等于 val
        if (nums[i] !== val) {
            // 将该元素移动到 k 的位置
            nums[k] = nums[i];
            // k 向后移动，准备存放下一个有效元素
            k++;
        }
    }

    // 最终 k 就是不等于 val 的元素个数
    return k;
};