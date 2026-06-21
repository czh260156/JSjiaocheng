/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];

    /**
     * 辅助回溯函数
     * @param {string} currentStr 当前生成的字符串
     * @param {number} open 已使用的左括号数量
     * @param {number} close 已使用的右括号数量
     */
    function backtrack(currentStr, open, close) {
        // 1. 终止条件：当字符串长度达到 2n 时，说明一组组合生成完毕
        if (currentStr.length === 2 * n) {
            result.push(currentStr);
            return;
        }

        // 2. 尝试添加左括号：只要左括号还没用完
        if (open < n) {
            backtrack(currentStr + "(", open + 1, close);
        }

        // 3. 尝试添加右括号：只有当右括号数量少于左括号时，添加右括号才是有效的
        if (close < open) {
            backtrack(currentStr + ")", open, close + 1);
        }
    }

    backtrack("", 0, 0);
    return result;
};