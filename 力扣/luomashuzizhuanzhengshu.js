/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // 1. 定义映射关系
    const symbolMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let total = 0;
    
    // 2. 遍历整个字符串
    for (let i = 0; i < s.length; i++) {
        let curr = symbolMap[s[i]];
        let next = symbolMap[s[i + 1]];

        // 核心逻辑：
        // 如果当前字符的值小于下一个字符的值（比如 IV 中的 I < V）
        // 按照罗马数字规则，这属于减法，所以减去当前值
        if (next && curr < next) {
            total -= curr;
        } else {
            // 否则（比如 VI 中的 V > I），属于正常的加法，加上当前值
            total += curr;
        }
    }

    // 3. 返回最终累加的结果
    return total;
};