/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let length = 0;
    let i = s.length - 1;

    // 1. 从后往前走，跳过末尾的所有空格
    while (i >= 0 && s[i] === ' ') {
        i--;
    }

    // 2. 找到单词后，开始计数，直到再次遇到空格或到达开头
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }

    return length;
};