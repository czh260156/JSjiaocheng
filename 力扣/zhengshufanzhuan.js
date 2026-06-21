/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let res = 0;
    // 定义 32 位有符号整数的边界
    const MAX = 2147483647;      // 2^31 - 1
    const MIN = -2147483648;     // -2^31

    while (x !== 0) {
        // 1. 弹出末位数字
        // 在 JS 中，-123 % 10 会得到 -3，这符合逻辑
        const digit = x % 10;
        
        // 2. 更新 x，去掉末位
        // Math.trunc 直接去掉小数部分，正负数通用
        x = Math.trunc(x / 10);
        
        // 3. 在累加前进行溢出检查（模拟 32 位环境）
        // 如果当前结果已经快要超过边界，则提前返回 0
        if (res > MAX / 10 || (res === MAX / 10 && digit > 7)) return 0;
        if (res < MIN / 10 || (res === MIN / 10 && digit < -8)) return 0;

        // 4. 累加结果
        res = res * 10 + digit;
    }

    return res;
};