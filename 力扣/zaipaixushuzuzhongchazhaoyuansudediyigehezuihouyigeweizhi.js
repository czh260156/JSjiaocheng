/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // 辅助函数：寻找边界
    // findFirst 为 true 找第一个出现的位置，为 false 找最后一个
    const findBound = (isFirst) => {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                result = mid; // 记录当前找到的索引
                if (isFirst) {
                    right = mid - 1; // 继续在左侧找更早的
                } else {
                    left = mid + 1;  // 继续在右侧找更晚的
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    };

    const firstPos = findBound(true);
    // 如果第一个位置都没找到，说明数组中没有该元素
    if (firstPos === -1) {
        return [-1, -1];
    }
    
    const lastPos = findBound(false);
    return [firstPos, lastPos];
};