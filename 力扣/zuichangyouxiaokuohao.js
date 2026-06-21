/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let maxLen = 0;
    // 初始栈放入 -1，作为第一个有效括号对的参照点
    const stack = [-1];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            // 遇到左括号，下标入栈
            stack.push(i);
        } else {
            // 遇到右括号，弹出栈顶尝试匹配
            stack.pop();
            
            if (stack.length === 0) {
                // 栈空了，说明这个右括号是多余的（非法边界）
                // 将它的下标入栈，作为新的参照点
                stack.push(i);
            } else {
                // 栈不空，匹配成功
                // 计算长度：当前下标 - 匹配后的栈顶下标
                const currentLen = i - stack[stack.length - 1];
                maxLen = Math.max(maxLen, currentLen);
            }
        }
    }

    return maxLen;
};