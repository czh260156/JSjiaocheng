/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 初始化当前和与最大和为第一个元素
    let currentSum = nums[0];
    let maxSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // 如果当前和加上 nums[i] 还没有 nums[i] 本身大，
        // 说明之前的子数组对增大和没有贡献，我们从当前 nums[i] 重新开始计算
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        
        // 更新全局最大值
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};