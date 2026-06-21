/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!s || words.length === 0) return [];

    const wordLen = words[0].length;
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;
    const sLen = s.length;
    const result = [];

    // 1. 构建 words 的频率表
    const counts = new Map();
    for (const word of words) {
        counts.set(word, (counts.get(word) || 0) + 1);
    }

    // 2. 分 wordLen 组进行滑动窗口扫描
    // 这样做是为了确保能匹配到所有可能的对齐方式
    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let right = i;
        let seen = new Map();
        let count = 0; // 当前窗口内匹配的有效单词数

        while (right + wordLen <= sLen) {
            // 提取右侧新单词
            const word = s.substring(right, right + wordLen);
            right += wordLen;

            if (counts.has(word)) {
                seen.set(word, (seen.get(word) || 0) + 1);
                count++;

                // 如果该单词出现次数超过了 words 中的规定次数，收缩左边界
                while (seen.get(word) > counts.get(word)) {
                    const leftWord = s.substring(left, left + wordLen);
                    seen.set(leftWord, seen.get(leftWord) - 1);
                    count--;
                    left += wordLen;
                }

                // 如果窗口内的有效单词数量等于 wordCount，说明找到了一个结果
                if (count === wordCount) {
                    result.push(left);
                }
            } else {
                // 遇到不在词典里的单词，直接重置窗口
                seen.clear();
                count = 0;
                left = right;
            }
        }
    }

    return result;
};