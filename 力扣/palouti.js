/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // 处理基础情况
    if (n <= 2) return n;

    // p 代表前前一个状态 f(n-2)，初始化为 f(1)
    // q 代表前一个状态 f(n-1)，初始化为 f(2)
    let p = 1;
    let q = 2;
    let res = 0;

    for (let i = 3; i <= n; i++) {
        // 当前状态 = 前两个状态之和
        res = p + q;
        
        // 滚动更新变量
        p = q;
        q = res;
    }

    return res;
};