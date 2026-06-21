var addBinary = function(a, b) {
    // 0b 是二进制前缀，BigInt 将其转为大整数
    // 相加后利用 toString(2) 转回二进制字符串
    return (BigInt("0b" + a) + BigInt("0b" + b)).toString(2);
};