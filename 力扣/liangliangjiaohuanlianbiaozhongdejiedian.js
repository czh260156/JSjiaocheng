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
var swapPairs = function(head) {
    // 1. 创建虚拟头节点，指向 head
    let dummy = new ListNode(0);
    dummy.next = head;
    
    // temp 指向要交换的一对节点之前的一个节点
    let temp = dummy;

    // 2. 只有当 temp 后面至少有两个节点时才进行交换
    while (temp.next !== null && temp.next.next !== null) {
        let node1 = temp.next;
        let node2 = temp.next.next;

        // 3. 执行交换步骤
        // 原始：temp -> node1 -> node2 -> (node2.next)
        temp.next = node2;            // temp -> node2
        node1.next = node2.next;      // node1 -> (node2.next)
        node2.next = node1;           // node2 -> node1
        // 结果：temp -> node2 -> node1 -> (node1.next)

        // 4. 将 temp 移动到下一对节点之前（即移动两格）
        temp = node1;
    }

    return dummy.next;
};