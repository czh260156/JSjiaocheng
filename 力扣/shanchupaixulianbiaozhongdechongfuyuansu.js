/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // 基础边界检查：空链表或只有一个节点的链表
    if (!head) {
        return head;
    }

    let cur = head;

    // 只要当前节点和下一个节点都存在，就继续遍历
    while (cur && cur.next) {
        if (cur.val === cur.next.val) {
            // 发现重复，跳过下一个节点
            cur.next = cur.next.next;
        } else {
            // 值不同，指针才向后移动
            cur = cur.next;
        }
    }

    return head;
};