/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxReach = 0; // 记录当前能跳到的最远距离
    
    for (let i = 0; i < nums.length; i++) {
        // 如果当前位置 i 已经超过了最远能到达的距离，说明无法继续前进
        if (i > maxReach) {
            return false;
        }
        
        // 更新最远能到达的距离
        maxReach = Math.max(maxReach, i + nums[i]);
        
        // 如果最远距离已经覆盖了最后一个下标，提前返回 true
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }
    
    return false;
};