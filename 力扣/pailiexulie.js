/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    // 1. 预计算阶乘数组，用于确定每一位的组大小
    const factorial = [1];
    const nums = [];
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
        nums.push(i); // 可用数字列表 [1, 2, ..., n]
    }

    // 2. 将 k 转换为从 0 开始的索引
    k--; 
    let res = "";

    // 3. 逐位确定数字
    for (let i = n; i > 0; i--) {
        // 当前位的后面还有 i-1 个位置，所以每组的大小是 (i-1)!
        let groupSize = factorial[i - 1];
        
        // 计算当前位对应的数字在可用列表中的索引
        let index = Math.floor(k / groupSize);
        
        // 取出数字并放入结果字符串
        res += nums[index];
        
        // 从可用列表中移除已使用的数字
        nums.splice(index, 1);
        
        // 更新 k，用于确定下一位
        k %= groupSize;
    }

    return res;
};