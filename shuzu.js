// 1. 什么是数组
const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits, '数组');

// 2. 通过下标获取元素
console.log(fruits[0], '通过下标获取元素1');
console.log(fruits[3], '通过下标获取元素4');

// 3. 获取数组的长度
console.log(fruits.length, '获取数组的长度');

// 4. 添加元素
fruits.push('Pineapple');
console.log(fruits, '添加元素');

// 5. 删除元素
fruits.pop();
console.log(fruits, '删除元素');

// 6. 继续删除元素
fruits.pop();
console.log(fruits, '继续删除元素');

// 7. unshift 在数组开头添加元素
fruits.unshift('pear');
console.log(fruits, 'unshift');

// 8. shift 删除数组开头的元素
fruits.shift();
console.log(fruits, 'shift');

// 9. splice 可以删除，替换，插入元素
const colors = ["red", "green", "blue"];
colors.splice(1, 1, "yellow");
console.log(colors, 'splice替换之后');

// 10. slice 可以截取数组
const newColors = colors.slice(1, 2);
console.log(newColors, 'slice截取结果');
console.log(colors, '原数组');

// 11. includes 判断数组中是否包含某个元素
console.log(colors.includes('red'), 'includes++++');
console.log(colors.includes('black'), 'includes++++');

// 12. indexOf 获取某个元素的索引以至于判断能不能找到该元素，找不到返回的索引为-1
console.log(colors.indexOf('red'), '++++++++indexOf++++++');
console.log(colors.indexOf('black'), 'indexOf++++++');
console.log(colors.indexOf('blue'), '--------indexOf++++++');

// 13. join 将数组转换成字符串
console.log(colors.join('-'), 'join++++');

// 14. 复合数组
const arrrr = [1, 2, ["asdada"], true];
console.log(arrrr, '复合数组');
console.log(arrrr[1], '复合数组第二个元素787878');
console.log(arrrr[2][0], '复合数组第三个元素的第一个');