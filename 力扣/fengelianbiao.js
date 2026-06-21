/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    // 准备两个哑节点
    let dummySmall = new ListNode(0);
    let dummyLarge = new ListNode(0);
    
    // 两个指针分别代表两个链表的当前末尾
    let small = dummySmall;
    let large = dummyLarge;
    
    // 遍历原链表
    let curr = head;
    while (curr !== null) {
        if (curr.val < x) {
            small.next = curr;
            small = small.next;
        } else {
            large.next = curr;
            large = large.next;
        }
        curr = curr.next;
    }
    
    // 关键：切断 large 链表末尾可能存在的旧引用，防止成环
    large.next = null;
    
    // 拼接两个链表
    small.next = dummyLarge.next;
    
    return dummySmall.next;
};