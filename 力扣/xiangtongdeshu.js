/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // 1. 如果两个节点都为空，则相同
    if (p === null && q === null) {
        return true;
    }

    // 2. 如果其中一个为空，或者值不相等，则不同
    if (p === null || q === null || p.val !== q.val) {
        return false;
    }

    // 3. 递归检查左子树和右子树
    // 只有当左、右子树都相同时，整棵树才相同
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};