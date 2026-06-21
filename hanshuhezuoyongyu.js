// 函数声明
function sayHello() {
    console.log("你好三亚学院");
}
// 调用函数
sayHello();

// 带参数的函数
function introduce(name, age) {
    console.log(`我叫${name}，今年龄${age}`); //模板字符串，用于动态展示数据
}
introduce("小王", 18);
introduce("小王=adad", 10008);

// 带返回值的函数
function add(num1, num2) {
    return num1 * num2;
}
const sum = add(20, 6);
console.log(sum, '++++++++++++++++');

// 默认参数,调用函数时如果没用传值，就使用默认值
function greet(name = "同学") {
    console.log(`你好，${name}`);
}
greet();
greet("小898989");

// 形参和实参：形参是函数定义时使用的参数，实参是函数调用时使用的参数
function showInfo(userName, city) {
    console.log(userName, city, '形参接收实参');
}
showInfo("小saas", "上海");

// 函数作用域,在函数内部声明的变量，只能在函数内部使用
function showMessage() {
    const message = "这是函数的内部变量";
    console.log(message, '函数内部可以访问');
}
showMessage();
// 全局作用域,在函数外部声明的变量，可以在函数内部使用，整个文件大多数地方都可以访问
const websiteName = "js 教程";

function showWebsiteName() {
    console.log(websiteName, '函数外部可以访问');
}
showWebsiteName();

// 块级作用域
// let 和 const声明的变量，只能在当前代码块内有效；
if (true) {
    let blockLet = "let 在代码块内有效";
    const blockConst = "const 在代码块内有效";
    console.log(blockLet, blockConst, '代码块内可以访问');
}
// console.log(blockLet, blockConst, '代码块内可以访问++++');
console.log("函数重点：声明，调用，参数，返回值，默认参数");
console.log("作用域重点：函数作用域，全局作用域，块级作用域");