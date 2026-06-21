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
    // 如果链表为空或只有一个节点，直接返回
    if (!head || !head.next) {
        return head;
    }

    // 创建哑节点，指向头节点
    let dummy = new ListNode(0, head);
    let cur = dummy;

    while (cur.next && cur.next.next) {
        // 如果连续两个节点的值相同
        if (cur.next.val === cur.next.next.val) {
            // 记录下这个重复的值
            let x = cur.next.val;
            // 循环删除所有等于该值的节点
            while (cur.next && cur.next.val === x) {
                cur.next = cur.next.next;
            }
        } else {
            // 没有发现重复，指针正常后移
            cur = cur.next;
        }
    }

    return dummy.next;
};