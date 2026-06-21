/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    const stack = [];
    // 在数组前后各加一个高度为 0 的柱子（哨兵）
    const newHeights = [0, ...heights, 0];

    for (let i = 0; i < newHeights.length; i++) {
        // 维持一个单调递增栈
        // 当遇到当前柱子比栈顶柱子矮时，说明栈顶柱子的右边界找到了
        while (stack.length > 0 && newHeights[i] < newHeights[stack[stack.length - 1]]) {
            // 弹出栈顶索引，作为矩形的高度
            const h = newHeights[stack.pop()];
            
            // 弹出后的新栈顶就是该高度的左边界索引
            // 宽度 = 当前索引 i - 新栈顶索引 - 1
            const w = i - stack[stack.length - 1] - 1;
            
            maxArea = Math.max(maxArea, h * w);
        }
        // 当前索引入栈
        stack.push(i);
    }

    return maxArea;
};