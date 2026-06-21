/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    // 特判 0 的情况
    if (num1 === '0' || num2 === '0') return '0';

    let m = num1.length, n = num2.length;
    // 结果最多有 m + n 位
    let res = new Array(m + n).fill(0);

    // 从后往前遍历两个字符串
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            // 当前两位数字的乘积
            let mul = (num1[i] - '0') * (num2[j] - '0');
            
            // 乘积在 res 数组中对应的两个位置
            let p1 = i + j;     // 进位位置
            let p2 = i + j + 1; // 当前位位置

            // 累加到当前位置
            let sum = mul + res[p2];
            
            // 更新当前位和进位
            res[p2] = sum % 10;
            res[p1] += Math.floor(sum / 10);
        }
    }

    // 去掉前导零
    let resultStr = res.join('');
    // 使用正则去掉开头的 0，或者用 while 循环寻找第一个非 0 索引
    while (resultStr[0] === '0') {
        resultStr = resultStr.substring(1);
    }

    return resultStr === '' ? '0' : resultStr;
};