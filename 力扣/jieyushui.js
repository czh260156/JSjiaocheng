/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let result = 0;

    while (left < right) {
        // 哪边低，就处理哪边
        if (height[left] < height[right]) {
            // 处理左侧
            if (height[left] >= leftMax) {
                // 更新左侧最大高度
                leftMax = height[left];
            } else {
                // 当前柱子矮于左侧最大值，可以接到水
                result += leftMax - height[left];
            }
            left++;
        } else {
            // 处理右侧
            if (height[right] >= rightMax) {
                // 更新右侧最大高度
                rightMax = height[right];
            } else {
                // 当前柱子矮于右侧最大值，可以接到水
                result += rightMax - height[right];
            }
            right--;
        }
    }

    return result;
};