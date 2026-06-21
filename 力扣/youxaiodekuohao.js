/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // 1. 如果字符串长度是奇数，肯定不匹配
    if (s.length % 2 !== 0) return false;

    // 2. 建立括号映射表 (右括号为键，左括号为值)
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    const stack = [];

    // 3. 遍历字符串
    for (let char of s) {
        // 如果是右括号
        if (map[char]) {
            // 弹出栈顶元素进行匹配
            // 如果栈为空（没有左括号了），或者栈顶不匹配
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // 如果是左括号，直接入栈
            stack.push(char);
        }
    }

    // 4. 最后检查栈是否为空
    return stack.length === 0;
};