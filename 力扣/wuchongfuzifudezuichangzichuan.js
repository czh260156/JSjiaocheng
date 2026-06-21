/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let n = s.length;
    let maxLen = 0;
    let left = 0;
    // 使用 Map 记录字符上一次出现的位置索引
    let map = new Map();

    for (let right = 0; right < n; right++) {
        let char = s[right];
        
        // 如果字符已经在 Map 中，且其索引在当前窗口内（>= left）
        if (map.has(char)) {
            // 将左指针移动到重复字符上一次出现位置的下一个位置
            // 使用 Math.max 是为了防止 left 指针向后跳（针对已不在窗口内的重复字符）
            left = Math.max(left, map.get(char) + 1);
        }
        
        // 更新当前字符的位置
        map.set(char, right);
        
        // 计算并更新最大长度：当前窗口大小为 (right - left + 1)
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};