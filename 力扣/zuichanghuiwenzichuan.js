/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length < 2) return s;

    let start = 0;
    let maxLength = 1;

    // 将辅助函数放在内部，确保作用域安全
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // 这里的长度计算：(right - 1) - (left + 1) + 1 = right - left - 1
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(i, i);       // 奇数回文中心
        let len2 = expandAroundCenter(i, i + 1);   // 偶数回文中心
        
        let curMaxLen = Math.max(len1, len2);

        // 如果发现比当前记录更长的回文
        if (curMaxLen > maxLength) {
            maxLength = curMaxLen;
            // 计算起始位置的通用公式：
            // 对于奇数 (len=3, i=1): 1 - floor(2/2) = 0
            // 对于偶数 (len=4, i=1): 1 - floor(3/2) = 0
            start = i - Math.floor((curMaxLen - 1) / 2);
        }
    }

    return s.substring(start, start + maxLength);
};