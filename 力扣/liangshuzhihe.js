/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 创建一个 Map 用来存储已经遍历过的数字及其索引
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        // 计算当前数字需要的“配对数字”
        const complement = target - nums[i];
        
        // 如果这个配对数字已经在 Map 中，说明找到了答案
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // 如果没找到，就把当前数字和它的索引存入 Map 中
        map.set(nums[i], i);
    }
};