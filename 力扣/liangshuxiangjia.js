/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummyHead = new ListNode(0); // 虚拟头节点
    let curr = dummyHead;           // 结果链表当前指针
    let carry = 0;                  // 进位

    // 只要 l1 或 l2 没遍历完，或者还有进位，就继续
    while (l1 !== null || l2 !== null || carry !== 0) {
        let x = (l1 !== null) ? l1.val : 0;
        let y = (l2 !== null) ? l2.val : 0;
        
        let sum = carry + x + y;
        carry = Math.floor(sum / 10); // 计算新的进位
        
        // 创建存储当前位数字的新节点
        curr.next = new ListNode(sum % 10);
        curr = curr.next; // 移动到下一个节点

        // 移动原链表指针
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummyHead.next; // 返回真正的头节点
};