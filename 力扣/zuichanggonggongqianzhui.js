/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    // 边界情况：如果数组为空，直接返回空字符串
    if (strs.length === 0) return "";

    // 遍历第一个字符串的每一个字符
    for (let i = 0; i < strs[0].length; i++) {
        let char = strs[0][i]; // 当前要比较的字符
        
        // 检查数组中其余的字符串
        for (let j = 1; j < strs.length; j++) {
            // 如果：
            // 1. 当前索引 i 已经超过了某个字符串的长度
            // 2. 或者当前字符与某个字符串的对应位置字符不匹配
            if (i === strs[j].length || strs[j][i] !== char) {
                // 截取第一个字符串从 0 到 i 的部分作为结果返回
                return strs[0].substring(0, i);
            }
        }
    }

    // 如果遍历完第一个字符串都没有触发返回，说明第一个字符串本身就是公共前缀
    return strs[0];
};