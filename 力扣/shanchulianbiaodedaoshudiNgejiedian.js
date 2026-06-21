/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 1. 创建一个虚拟头节点，处理删除头节点的边界情况
    let dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;

    // 2. 快指针先走 n + 1 步
    // 这样快慢指针之间就隔了 n 个节点
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // 3. 同时移动快慢指针，直到快指针走到末尾
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // 4. 此时 slow 指向待删除节点的前一个位置
    // 直接跳过待删除节点
    slow.next = slow.next.next;

    // 5. 返回真正的头节点
    return dummy.next;
};