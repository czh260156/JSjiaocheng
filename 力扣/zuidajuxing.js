/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 更新当前行各列的高度
            if (matrix[i][j] === '1') {
                heights[j] += 1;
            } else {
                heights[j] = 0;
            }
        }
        // 调用计算柱状图最大面积的函数
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
};

/**
 * 辅助函数：计算一维柱状图的最大矩形面积（第 84 题解法）
 */
function largestRectangleArea(heights) {
    let max = 0;
    const stack = [];
    const newHeights = [0, ...heights, 0]; // 哨兵

    for (let i = 0; i < newHeights.length; i++) {
        while (stack.length > 0 && newHeights[i] < newHeights[stack[stack.length - 1]]) {
            const h = newHeights[stack.pop()];
            const w = i - stack[stack.length - 1] - 1;
            max = Math.max(max, h * w);
        }
        stack.push(i);
    }
    return max;
}