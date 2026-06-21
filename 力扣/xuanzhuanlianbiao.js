/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    // 1. 特殊情况判断
    if (!head || !head.next || k === 0) return head;

    // 2. 计算链表长度，并找到尾节点
    let n = 1;
    let oldTail = head;
    while (oldTail.next) {
        oldTail = oldTail.next;
        n++;
    }

    // 3. 取模：k 可能远大于 n
    k = k % n;
    if (k === 0) return head;

    // 4. 将链表连成环
    oldTail.next = head;

    // 5. 找到新的尾节点：在距离头节点 n - k - 1 的地方
    let newTail = head;
    for (let i = 0; i < n - k - 1; i++) {
        newTail = newTail.next;
    }

    // 6. 确定新的头节点，断开环
    let newHead = newTail.next;
    newTail.next = null;

    return newHead;
};