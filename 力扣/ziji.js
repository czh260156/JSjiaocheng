/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [[]]; // 初始化包含一个空集

    for (const num of nums) {
        const size = res.length;
        // 遍历当前已存在的所有子集
        for (let i = 0; i < size; i++) {
            // 拷贝现有子集并加入当前数字，然后放入结果集
            res.push([...res[i], num]);
        }
    }

    return res;
};