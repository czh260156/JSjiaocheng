// 算数运算符
let num1 = 1 + 1;
console.log(num1, '----------------------');

let num2 = 6 / 2;
console.log(num2, '----------------------');

let num3 = 10000 % 314;  // 取余
console.log(num3, '----------------------');

let num4 = 3 ** 4;  // 幂
console.log(num4, '----------------------');

// 比较运算符
let x = 1;
let y = 2;

let bool1 = (x == y);  // 相等（注意：JS中`==`是宽松相等，`===`才是全等）
console.log(bool1, '----------------------');

let bool2 = (x != y);  // 不等
console.log(bool2, '----------------------');

// 逻辑运算符
let bool3 = bool1 && bool2;  // 与
console.log(bool3, '----------------------');

let bool4 = bool1 || bool2;  // 或
console.log(bool4, '----------------------');

let bool5 = !bool4;  // 非
console.log(bool5, '----------------------');
