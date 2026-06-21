/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxArea = 0;
    let left = 0;
    let right = height.length - 1;

    while (left < right) {
        // 1. 计算当前的宽度
        const width = right - left;
        
        // 2. 容器高度由较矮的一边决定
        const currentHeight = Math.min(height[left], height[right]);
        
        // 3. 计算面积并更新最大值
        const area = width * currentHeight;
        maxArea = Math.max(maxArea, area);

        // 4. 关键逻辑：移动较矮那一侧的指针
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
};