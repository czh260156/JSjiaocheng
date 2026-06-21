/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    const n = s.length;
    if (n === 0 || s[0] === '0') return 0;

    // dp[i-2], dp[i-1]
    let prev2 = 1; // 相当于 dp[0]
    let prev1 = 1; // 相当于 dp[1]

    for (let i = 2; i <= n; i++) {
        let current = 0;
        
        // 1. 检查当前字符（单数字）
        const oneDigit = parseInt(s.substring(i - 1, i));
        if (oneDigit >= 1 && oneDigit <= 9) {
            current += prev1;
        }

        // 2. 检查当前字符和前一个字符（双数字）
        const twoDigits = parseInt(s.substring(i - 2, i));
        if (twoDigits >= 10 && twoDigits <= 26) {
            current += prev2;
        }

        // 如果既不能单解也不能双解（比如出现了 "30" 或 "00"），则 current 为 0
        // 之后的解码都会变成 0
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
};