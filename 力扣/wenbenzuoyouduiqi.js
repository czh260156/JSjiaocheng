/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    const res = [];
    let i = 0;

    while (i < words.length) {
        let j = i + 1;
        let lineLength = words[i].length;

        // 1. 确定当前行能容纳多少个单词
        // 每个单词后面至少要跟一个空格，所以计算长度时要加 1
        while (j < words.length && lineLength + 1 + words[j].length <= maxWidth) {
            lineLength += 1 + words[j].length;
            j++;
        }

        const numWords = j - i;
        let line = "";

        // 2. 格式化当前行
        // 如果是最后一行，或者该行只有一个单词 -> 左对齐
        if (j === words.length || numWords === 1) {
            line = words.slice(i, j).join(" ");
            // 末尾补齐空格
            line += " ".repeat(maxWidth - line.length);
        } else {
            // 普通行 -> 左右对齐
            const totalSpaces = maxWidth - words.slice(i, j).reduce((acc, w) => acc + w.length, 0);
            const numGaps = numWords - 1;
            const avgSpaces = Math.floor(totalSpaces / numGaps);
            const extraSpaces = totalSpaces % numGaps;

            for (let k = i; k < j; k++) {
                line += words[k];
                if (k < j - 1) {
                    // 插入平均空格数 + 是否需要补一个多出来的空格
                    const spacesToApply = avgSpaces + (k - i < extraSpaces ? 1 : 0);
                    line += " ".repeat(spacesToApply);
                }
            }
        }

        res.push(line);
        i = j; // 处理下一组单词
    }

    return res;
};