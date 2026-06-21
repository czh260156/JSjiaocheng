/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    // 如果区间数量少于2，直接返回即可
    if (intervals.length <= 1) return intervals;

    // 1. 按照起始位置对区间进行升序排序
    // O(n log n)
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];

    // 2. 遍历排序后的区间并进行合并
    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];
        let last = merged[merged.length - 1];

        // 如果当前区间的起始位置 <= 结果数组中最后一个区间的结束位置
        // 说明发生了重叠
        if (curr[0] <= last[1]) {
            // 合并区间：更新结果数组中最后一个区间的结束位置
            last[1] = Math.max(last[1], curr[1]);
        } else {
            // 没有重叠，直接放入结果数组
            merged.push(curr);
        }
    }

    return merged;
};