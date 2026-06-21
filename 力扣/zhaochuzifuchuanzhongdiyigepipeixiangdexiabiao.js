/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    const n = haystack.length;
    const m = needle.length;

    // 只需要遍历到能够容纳下 needle 的位置即可
    for (let i = 0; i <= n - m; i++) {
        // 截取当前位置开始，长度为 needle 长度的子串进行比较
        if (haystack.substring(i, i + m) === needle) {
            return i;
        }
    }

    return -1;
};