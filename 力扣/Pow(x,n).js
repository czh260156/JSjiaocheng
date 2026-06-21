/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    // 处理指数为 0 的情况
    if (n === 0) return 1;

    // 处理负指数
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }

    let res = 1;
    let currentProduct = x;

    // 快速幂迭代
    while (n > 0) {
        // 如果当前 n 是奇数（对应二进制位为 1）
        if (n % 2 === 1) {
            res = res * currentProduct;
        }
        
        // 累乘底数：x -> x^2 -> x^4 -> x^8...
        currentProduct = currentProduct * currentProduct;
        
        // 指数折半（向下取整）
        n = Math.floor(n / 2);
    }

    return res;
};