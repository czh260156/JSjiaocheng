/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    let digitSeen = false;
    let dotSeen = false;
    let eSeen = false;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char >= '0' && char <= '9') {
            digitSeen = true;
        } else if (char === '+' || char === '-') {
            // 符号只能出现在第一位，或者 e/E 的紧后方
            if (i > 0 && s[i - 1] !== 'e' && s[i - 1] !== 'E') {
                return false;
            }
        } else if (char === '.') {
            // 小数点不能重复出现，且不能出现在 e/E 之后
            if (dotSeen || eSeen) {
                return false;
            }
            dotSeen = true;
        } else if (char === 'e' || char === 'E') {
            // e/E 不能重复出现，且前面必须有数字
            if (eSeen || !digitSeen) {
                return false;
            }
            eSeen = true;
            // 重置 digitSeen，因为 e 后面必须紧跟整数（包含数字）
            digitSeen = false;
        } else {
            // 出现其他非法字符
            return false;
        }
    }

    // 最终必须包含数字
    return digitSeen;
};