var groupAnagrams = function(strs) {
    const map = new Map();

    for (const s of strs) {
        // 创建长度为 26 的频率表
        const count = new Array(26).fill(0);
        for (const char of s) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        
        // 将频率表转为字符串作为 Key，例如 "1,0,1,0..."
        const key = count.join(',');
        
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }

    return Array.from(map.values());
};