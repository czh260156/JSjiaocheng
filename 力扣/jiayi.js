/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    const n = digits.length;
    
    // 从最后一位开始往前遍历
    for (let i = n - 1; i >= 0; i--) {
        // 当前位加 1
        digits[i]++;
        
        // 取模 10。如果原本是 9，现在变 10，取模后变 0
        digits[i] %= 10;
        
        // 如果当前位不是 0，说明没有产生进位，直接返回结果
        if (digits[i] !== 0) {
            return digits;
        }
        
        // 如果当前位是 0，说明产生了进位，继续循环处理前一位
    }

    // 如果运行到这里，说明所有位都进位了（例如 999 变成了 000）
    // 我们需要在最前面添加一个 1
    // JavaScript 中简单的做法是创建一个新数组
    return [1, ...digits];
};