/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let p0 = 0;             // 0 的边界
    let curr = 0;           // 当前指针
    let p2 = nums.length - 1; // 2 的边界

    while (curr <= p2) {
        if (nums[curr] === 0) {
            // 发现 0，交换到前面去
            [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
            p0++;
            curr++;
        } else if (nums[curr] === 2) {
            // 发现 2，交换到后面去
            [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
            // 此时不移动 curr，因为换回来的数可能是 0 或 1，需要下一轮检查
            p2--;
        } else {
            // 发现 1，保持现状，继续向后看
            curr++;
        }
    }
};