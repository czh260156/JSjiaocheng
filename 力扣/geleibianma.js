/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    let result = [0]; // 初始 n=0 的情况
    for (let i = 0; i < n; i++) {
        const add = 1 << i; // 当前需要加的最高位权重 (1, 2, 4, 8...)
        // 从后往前遍历现有结果，实现镜像反射
        for (let j = result.length - 1; j >= 0; j--) {
            result.push(result[j] + add);
        }
    }
    return result;
};