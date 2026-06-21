/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (lists.length === 0) return null;
    return divideAndConquer(lists, 0, lists.length - 1);
};

// 分治辅助函数
function divideAndConquer(lists, left, right) {
    if (left === right) return lists[left];
    
    let mid = Math.floor((left + right) / 2);
    // 递归处理左半部分和右半部分
    let l1 = divideAndConquer(lists, left, mid);
    let l2 = divideAndConquer(lists, mid + 1, right);
    
    // 最后合并两个结果
    return mergeTwoLists(l1, l2);
}

// 合并两个有序链表的辅助函数 (第 21 题逻辑)
function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;
    
    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    
    curr.next = l1 !== null ? l1 : l2;
    return dummy.next;
}