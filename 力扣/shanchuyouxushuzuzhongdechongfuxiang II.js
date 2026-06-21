/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    const n = nums.length;
    // 如果长度小于等于 2，直接返回长度即可
    if (n <= 2) {
        return n;
    }

    // slow 指针从索引 2 开始，因为前两个元素总是合法的
    let slow = 2;
    
    // fast 指针从索引 2 开始遍历整个数组
    for (let fast = 2; fast < n; fast++) {
        // 关键判断：当前元素是否与“已确定的有效序列”倒数第二个元素相同
        if (nums[fast] !== nums[slow - 2]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }

    return slow;
};