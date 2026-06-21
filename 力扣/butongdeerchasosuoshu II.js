/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    if (n === 0) return [];

    // 使用辅助函数进行递归分治
    const build = (start, end) => {
        const res = [];
        
        // 基准情况：如果起始值大于结束值，说明此时没有数字，返回包含 null 的数组（代表空子树）
        if (start > end) {
            res.push(null);
            return res;
        }

        // 枚举每一个数字作为根节点
        for (let i = start; i <= end; i++) {
            // 递归得到所有可能的左子树
            const leftTrees = build(start, i - 1);
            // 递归得到所有可能的右子树
            const rightTrees = build(i + 1, end);

            // 从左子树集合和右子树集合中各选一个，拼接到当前根节点上
            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    res.push(root);
                }
            }
        }
        return res;
    };

    return build(1, n);
};