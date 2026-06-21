var isValidBST = function(root) {
    let prev = -Infinity; // 记录前一个节点的值

    const inorder = (node) => {
        if (!node) return true;

        // 1. 先访问左子树
        if (!inorder(node.left)) return false;

        // 2. 访问根节点：检查是否严格递增
        if (node.val <= prev) return false;
        prev = node.val;

        // 3. 最后访问右子树
        return inorder(node.right);
    };

    return inorder(root);
};