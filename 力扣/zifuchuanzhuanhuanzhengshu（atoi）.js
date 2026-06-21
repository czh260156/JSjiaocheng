/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let i = 0;
    const n = s.length;
    
    // 1. 去掉前导空格
    while (i < n && s[i] === ' ') {
        i++;
    }
    
    // 2. 处理符号位
    let sign = 1;
    if (i < n && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    
    // 3. 转换数字
    let res = 0;
    const MAX = 2147483647;      // 2^31 - 1
    const MIN = -2147483648;     // -2^31
    
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        // 将字符转为数字并累加
        res = res * 10 + (s[i] - '0');
        
        // 提前检查防止 res 过大导致精度丢失
        // 这里的 2147483648 是 2^31，比最大值稍微多一点，足够处理溢出判断
        if (res > 2147483648) break; 
        
        i++;
    }
    
    // 4. 应用符号
    res = res * sign;
    
    // 5. 范围检查与截断
    if (res > MAX) return MAX;
    if (res < MIN) return MIN;
    
    return res;
};