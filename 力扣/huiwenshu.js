/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // 1. 排除特殊情况：负数不是回文，且除了 0 以外，以 0 结尾的数都不是回文
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let revertedNumber = 0;
    // 2. 反转数字的一半
    // 当 x 逐渐变小，revertedNumber 逐渐变大，
    // 当 x <= revertedNumber 时，说明已经处理了一半的位数
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    // 3. 比较
    // 如果是偶数位，x 应该等于 revertedNumber
    // 如果是奇数位，x 应该等于 Math.floor(revertedNumber / 10) (去掉中间那一位)
    return x === revertedNumber || x === Math.floor(revertedNumber / 10);
};