/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // 存储 t 中字符需要的频率
    const need = {};
    // 存储当前窗口中字符的频率
    const window = {};
    for (let char of t) {
        need[char] = (need[char] || 0) + 1;
    }

    let left = 0, right = 0;
    let valid = 0; // 窗口中满足 need 条件的字符个数
    // 记录最小覆盖子串的起始索引及长度
    let start = 0, minLen = Infinity;

    while (right < s.length) {
        // c 是将移入窗口的字符
        const c = s[right];
        right++;
        
        // 进行窗口内数据的一系列更新
        if (need[c]) {
            window[c] = (window[c] || 0) + 1;
            if (window[c] === need[c]) {
                valid++;
            }
        }

        // 判断左侧窗口是否要收缩
        while (valid === Object.keys(need).length) {
            // 在这里更新最小覆盖子串
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            
            // d 是将移出窗口的字符
            const d = s[left];
            left++;
            
            // 进行窗口内数据的一系列更新
            if (need[d]) {
                if (window[d] === need[d]) {
                    valid--;
                }
                window[d]--;
            }
        }
    }

    // 返回结果
    return minLen === Infinity ? "" : s.substr(start, minLen);
};