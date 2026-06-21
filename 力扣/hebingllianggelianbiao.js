/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // 1. 创建虚拟头节点，简化逻辑
    let dummy = new ListNode(-1);
    let curr = dummy;

    // 2. 迭代比较两个链表的当前节点
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next; // 移动新链表的末尾指针
    }

    // 3. 将未遍历完的链表直接拼接到末尾
    if (list1 !== null) {
        curr.next = list1;
    } else {
        curr.next = list2;
    }

    // 4. 返回虚拟头节点的下一个节点，即真正的合并后头节点
    return dummy.next;
};