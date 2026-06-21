/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    // 1. 定义 32 位整数的边界
    const MAX_INT = 2147483647;  // 2^31 - 1
    const MIN_INT = -2147483648; // -2^31

    // 2. 特殊情况处理：溢出
    if (dividend === MIN_INT && divisor === -1) {
        return MAX_INT;
    }
    if (divisor === 1) return dividend;

    // 3. 确定结果的正负号
    // 如果两个数符号不同，结果为负
    const isNegative = (dividend < 0) !== (divisor < 0);

    // 4. 全部转为正数处理（使用 Math.abs）
    let a = Math.abs(dividend);
    let b = Math.abs(divisor);
    let res = 0;

    // 5. 核心逻辑：倍增法
    while (a >= b) {
        let tempDivisor = b;
        let count = 1;

        // 只要 a 还能减去 tempDivisor 的两倍，就继续翻倍
        // 使用加法代替乘 2：tempDivisor + tempDivisor
        while (a >= (tempDivisor + tempDivisor)) {
            // 注意防止 JavaScript 中加法溢出（虽然 JS 数字是 64 位，但模拟 32 位逻辑时需小心）
            // 在 JS 中，由于数字是 64 位浮点数，直接相加到 2^31 没问题
            if (tempDivisor > 1073741823) break; // 超过 MAX_INT 的一半就停止翻倍

            tempDivisor += tempDivisor;
            count += count;
        }

        // 减去最大的倍数，累加商
        a -= tempDivisor;
        res += count;
    }

    // 6. 根据符号返回结果
    return isNegative ? -res : res;
};