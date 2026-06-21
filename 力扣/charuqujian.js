/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;

    // 1. 处理在 newInterval 左侧且无重叠的区间
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // 2. 处理重叠的区间并合并成一个新的 newInterval
    while (i < n && intervals[i][0] <= newInterval[1]) {
        // 更新起始位置为两者的最小值，结束位置为两者的最大值
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    // 将合并后的新区间放入结果
    result.push(newInterval);

    // 3. 处理在 newInterval 右侧且无重叠的区间
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
};