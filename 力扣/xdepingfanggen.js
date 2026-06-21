/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x < 2) return x; // 0 和 1 的平方根是它们本身

    let left = 0;
    let right = x;
    let ans = 0;

    while (left <= right) {
        // 使用 Math.floor 防止 mid 变成浮点数
        let mid = Math.floor((left + right) / 2);
        
        // 比较 mid 的平方与 x
        // 注意：在某些语言中 mid * mid 可能溢出，但 JS 的 Number 能处理到 2^53
        if (mid * mid <= x) {
            ans = mid;      // 暂时记录下这个可能的答案
            left = mid + 1; // 尝试寻找更大的整数
        } else {
            right = mid - 1;
        }
    }

    return ans;
};