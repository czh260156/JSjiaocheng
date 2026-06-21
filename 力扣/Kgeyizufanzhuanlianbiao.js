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
var reverseKGroup = function(head, k) {
    // 1. 检查是否有至少 k 个节点
    let curr = head;
    for (let i = 0; i < k; i++) {
        if (curr === null) return head; // 不足 k 个，保持原样返回
        curr = curr.next;
    }

    // 2. 反转当前的 k 个节点
    let prev = null;
    let node = head;
    for (let i = 0; i < k; i++) {
        let nextNode = node.next; // 暂存下一个节点
        node.next = prev;         // 反转指针指向
        prev = node;              // prev 前进
        node = nextNode;          // node 前进
    }

    // 3. 此时 prev 是这组翻转后的头节点
    // 原本的 head 变成了这组翻转后的尾节点
    // 递归处理剩余部分，并连接到当前尾部
    head.next = reverseKGroup(node, k);

    // 4. 返回翻转后的头节点
    return prev;
};