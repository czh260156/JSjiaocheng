/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const res = [];
    const stack = [];
    let curr = root;

    while (curr !== null || stack.length > 0) {
        // 1. 尽可能地向左走，并把路径上的节点入栈
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        // 2. 当前节点为空，说明左边走到底了，弹出栈顶元素
        curr = stack.pop();
        res.push(curr.val); // 访问节点

        // 3. 转向右子树
        curr = curr.right;
    }

    return res;
};