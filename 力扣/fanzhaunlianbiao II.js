/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    // 1. 设置虚拟头节点，处理 left=1 的边界情况
    const dummy = new ListNode(0);
    dummy.next = head;
    
    // 2. 将 pre 移动到 left 的前一个节点
    let pre = dummy;
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }
    
    // 3. curr 指向要反转部分的第一个节点
    let curr = pre.next;
    
    // 4. 开始局部反转：通过“头插法”
    // 将 curr 后的节点(nextNode)插入到 pre 之后
    // 循环次数为区间长度 - 1 (right - left)
    for (let i = 0; i < right - left; i++) {
        const nextNode = curr.next;
        
        // 步骤 a: curr 跨过 nextNode，指向下下个节点
        curr.next = nextNode.next;
        
        // 步骤 b: nextNode 指向当前反转部分的头部
        nextNode.next = pre.next;
        
        // 步骤 c: pre 指向新的头部 nextNode
        pre.next = nextNode;
    }
    
    return dummy.next;
};