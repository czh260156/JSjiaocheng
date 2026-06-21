/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    // 1. 边界情况：输入为空字符串
    if (digits.length === 0) return [];

    // 2. 建立数字到字母的映射表
    const phoneMap = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    /**
     * 辅助回溯函数
     * @param {number} index 当前处理第几个数字
     * @param {string} currentStr 当前积累的字符串组合
     */
    function backtrack(index, currentStr) {
        // 终止条件：字符串长度达到目标长度
        if (index === digits.length) {
            result.push(currentStr);
            return;
        }

        // 获取当前数字对应的所有字母
        const letters = phoneMap[digits[index]];
        
        // 遍历所有可能的字母并递归
        for (const char of letters) {
            backtrack(index + 1, currentStr + char);
        }
    }

    backtrack(0, "");
    return result;
};