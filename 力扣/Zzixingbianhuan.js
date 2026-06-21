/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    // 如果只有一行，或者字符串长度不够填满行，直接返回原字符串
    if (numRows === 1 || s.length <= numRows) return s;

    // 创建一个数组，用来存储每一行的内容
    const rows = new Array(Math.min(numRows, s.length)).fill("");
    let currRow = 0;
    let goingDown = false;

    // 遍历每一个字符
    for (const char of s) {
        rows[currRow] += char;
        
        // 当触碰到顶行或底行时，改变移动方向
        if (currRow === 0 || currRow === numRows - 1) {
            goingDown = !goingDown;
        }
        
        // 根据方向移动到下一行
        currRow += goingDown ? 1 : -1;
    }

    // 将所有行拼接成最终结果
    return rows.join("");
};