/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // 确保 nums1 是较短的数组，将时间复杂度优化至 O(log(min(m, n)))
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    let m = nums1.length;
    let n = nums2.length;
    let low = 0, high = m;
    let halfLen = Math.floor((m + n + 1) / 2);

    while (low <= high) {
        let i = Math.floor((low + high) / 2); // nums1 的划分位置
        let j = halfLen - i;                  // nums2 的划分位置

        // 边界处理：如果划分位置在数组边缘，使用正负无穷大代替
        let maxLeft1 = (i === 0) ? -Infinity : nums1[i - 1];
        let minRight1 = (i === m) ? Infinity : nums1[i];
        
        let maxLeft2 = (j === 0) ? -Infinity : nums2[j - 1];
        let minRight2 = (j === n) ? Infinity : nums2[j];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // 找到完美的划分点
            if ((m + n) % 2 === 0) {
                // 偶数个：(左侧最大 + 右侧最小) / 2
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                // 奇数个：左侧最大
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            // i 太大了，向左收缩
            high = i - 1;
        } else {
            // i 太小了，向右扩展
            low = i + 1;
        }
    }

    return 0.0;
};