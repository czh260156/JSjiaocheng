/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let n = nums.length;
    // 如果数组长度为 1，已经在终点，跳 0 次
    if (n === 1) return 0;

    let steps = 0;      // 跳跃次数
    let maxReach = 0;   // 下一跳能达到的最远位置
    let end = 0;        // 当前这一跳能到达的边界

    // 注意：只遍历到 n-1 之前，因为如果已经在最后一位则不需要再跳
    for (let i = 0; i < n - 1; i++) {
        // 在当前步数的范围内，不断寻找下一跳能跳得最远的地方
        maxReach = Math.max(maxReach, i + nums[i]);

        // 当到达了当前步数的最大边界
        if (i === end) {
            steps++;          // 必须再跳一次
            end = maxReach;   // 更新新的边界
            
            // 如果新边界已经覆盖终点，可以提前结束
            if (end >= n - 1) break;
        }
    }

    return steps;
};