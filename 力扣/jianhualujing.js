/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const stack = [];
    // 1. 按 '/' 分割路径
    const components = path.split('/');
    
    for (const component of components) {
        // 2. 处理各种情况
        if (component === '' || component === '.') {
            // 情况一：空字符串（多个/）或当前目录 .，忽略
            continue;
        } else if (component === '..') {
            // 情况二：返回上一级 ..，如果栈不为空则出栈
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            // 情况三：正常的目录名，入栈
            stack.push(component);
        }
    }
    
    // 3. 将栈中元素拼接成规范路径
    return '/' + stack.join('/');
};