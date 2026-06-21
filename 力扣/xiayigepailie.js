/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    let n = nums.length;
    let i = n - 2;

    // 1. 从右向左找到第一个 nums[i] < nums[i+1]
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        // 2. 从右向左找到第一个大于 nums[i] 的数
        let j = n - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }
        // 3. 交换 i 和 j
        swap(nums, i, j);
    }

    // 4. 反转 i 之后的序列（使其从降序变为升序，从而得到最小的后缀）
    reverse(nums, i + 1, n - 1);
};

// 辅助函数：交换数组元素
function swap(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

// 辅助函数：反转数组指定区间
function reverse(nums, start, end) {
    while (start < end) {
        swap(nums, start, end);
        start++;
        end--;
    }
}