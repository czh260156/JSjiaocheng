/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const res = [];
    const n = s.length;

    // 提前排除不可能的情况：IP 最短 4 位 (0.0.0.0)，最长 12 位 (255.255.255.255)
    if (n < 4 || n > 12) return res;

    const backtrack = (start, path) => {
        // 终止条件：找到了 4 个段
        if (path.length === 4) {
            // 如果正好用完了所有字符，则加入结果集
            if (start === n) {
                res.push(path.join('.'));
            }
            return;
        }

        // 尝试从当前位置开始截取 1 到 3 个字符
        for (let len = 1; len <= 3; len++) {
            // 越界处理
            if (start + len > n) break;

            const segment = s.substring(start, start + len);

            // 判定当前段是否合法
            // 1. 不能有前导零（除非该段就是 "0"）
            if (len > 1 && segment[0] === '0') continue;
            // 2. 数值不能超过 255
            if (len === 3 && parseInt(segment) > 255) continue;

            // 选择当前段，递归处理剩余部分
            path.push(segment);
            backtrack(start + len, path);
            // 回溯：撤销选择
            path.pop();
        }
    };

    backtrack(0, []);
    return res;
};