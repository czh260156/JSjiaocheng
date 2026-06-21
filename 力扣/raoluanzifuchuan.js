/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    const memo = new Map();

    const helper = (s1, s2) => {
        // 检查记忆化结果
        const key = s1 + ',' + s2;
        if (memo.has(key)) return memo.get(key);

        // 基础情况
        if (s1 === s2) return true;
        if (s1.length !== s2.length) return false;

        // 剪枝：如果字符频次不一致，直接返回 false
        if (!hasSameChars(s1, s2)) {
            memo.set(key, false);
            return false;
        }

        const n = s1.length;
        for (let i = 1; i < n; i++) {
            // 分割位置 i，将 s1 分为长度 i 和 n-i 的两部分
            
            // 情况一：不交换
            // s1[0...i] vs s2[0...i] AND s1[i...n] vs s2[i...n]
            if (helper(s1.substring(0, i), s2.substring(0, i)) && 
                helper(s1.substring(i), s2.substring(i))) {
                memo.set(key, true);
                return true;
            }

            // 情况二：交换
            // s1[0...i] vs s2[n-i...n] AND s1[i...n] vs s2[0...n-i]
            if (helper(s1.substring(0, i), s2.substring(n - i)) && 
                helper(s1.substring(i), s2.substring(0, n - i))) {
                memo.set(key, true);
                return true;
            }
        }

        memo.set(key, false);
        return false;
    };

    // 辅助函数：判断两个字符串字符组成是否相同
    function hasSameChars(str1, str2) {
        const count = {};
        for (let char of str1) count[char] = (count[char] || 0) + 1;
        for (let char of str2) {
            if (!count[char]) return false;
            count[char]--;
        }
        return true;
    }

    return helper(s1, s2);
};