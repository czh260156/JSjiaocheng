// 1.for循环
for (let i = 1; i <= 3; i++) {
    console.log(i, 'for循环');
}

// 2.while循环
let num = 1;
while (num <= 3) {
    console.log(num, 'while循环');
    num++
}

// 3.do...while循环
let num1 = 1;
do {
    console.log(num1, 'do...while循环');
    num1++
} while (num1 <= 3)

// for in 循环（循环的是对象的属性名（也就是常用于遍历对象的键））
const user = {
    name: '张三',
    age: 18
};
for (let key in user) {
    console.log(key, user[key], 'for in 循环');
}

// for of 循环（循环的是数组的属性值（也就是常用于遍历数组的值））
const colors = ['red', 'green', 'blue'];
for (let value of colors) {
    console.log(value, 'for of 循环');
}

// break 和 continue
for (let i = 1; i <= 3; i++) {
    if (i === 2) {
        break;
    }
    console.log(i, 'break 循环');
}

for (let i = 1; i <= 3; i++) {
    if (i === 2) {
        continue;
    }
    console.log(i, 'continue 循环');
}

// forEach 循环
colors.forEach(function (item) {
    console.log(item, 'forEach 循环');
});