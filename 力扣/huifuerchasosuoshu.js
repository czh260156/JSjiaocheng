/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
    let first = null;  // 第一个错误节点（较大值）
    let second = null; // 第二个错误节点（较小值）
    let prev = null;   // 用于中序遍历记录前一个访问的节点

    // 中序遍历函数
    const inorder = (node) => {
        if (!node) return;

        inorder(node.left);

        // 检查是否存在逆序：前一个节点的值 > 当前节点的值
        if (prev && prev.val > node.val) {
            // 如果是第一次发现逆序，记录 prev 为第一个错误节点
            if (!first) {
                first = prev;
            }
            // 无论是第一次还是第二次发现逆序，都先记录 node 为第二个错误节点
            // 这样处理可以同时覆盖“相邻交换”和“非相邻交换”两种情况
            second = node;
        }
        
        // 更新前一个节点
        prev = node;

        inorder(node.right);
    };

    // 1. 执行中序遍历，找到两个错误节点
    inorder(root);

    // 2. 交换这两个节点的值
    if (first && second) {
        const temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
};