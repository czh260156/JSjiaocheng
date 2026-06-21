/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    // 建立数值与罗马字符的对应关系，注意包含特殊的减法组合
    const valueSymbols = [
        [1000, "M"],
        [900,  "CM"],
        [500,  "D"],
        [400,  "CD"],
        [100,  "C"],
        [90,   "XC"],
        [50,   "L"],
        [40,   "XL"],
        [10,   "X"],
        [9,    "IX"],
        [5,    "V"],
        [4,    "IV"],
        [1,    "I"]
    ];

    let res = "";

    // 贪心算法：从最大的数值开始尝试扣减
    for (const [value, symbol] of valueSymbols) {
        // 只要当前的 num 还够减，就一直加对应的字符
        while (num >= value) {
            res += symbol;
            num -= value;
        }
        // 如果 num 为 0 了，可以提前结束
        if (num === 0) break;
    }

    return res;
};