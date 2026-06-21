/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 设置三个指针，从后往前走
    let p1 = m - 1;      // nums1 有效元素的末尾
    let p2 = n - 1;      // nums2 的末尾
    let p = m + n - 1;   // nums1 整个数组的末尾

    // 当两个数组都还有元素未处理时
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }

    // 如果 nums2 还有剩余（说明 nums2 的剩余元素都比 nums1 之前的元素小）
    // 直接把它们补到 nums1 的最前面
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
    
    // 注意：如果 p1 还有剩余则不需要处理，因为它们已经在 nums1 中排好序了
};