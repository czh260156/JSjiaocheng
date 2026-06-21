// 1.什么是字符串
const str1 = "hello";
const str2 = "JavaScript";

console.log(str1, "这是字符串1");
console.log(str2, "这是字符串2");

// 2. length
console.log(str1.length, "这是字符串1的长度");

// 3. 通过下标获取字符
console.log(str1[0], "这是字符串1的第一个字符");
console.log(str1[1], "这是字符串1的第二个字符");
console.log(str2[5], "这是字符串2的第5个字符");

// 4. 字符串拼接
const name = "张三";
const age = 18;

const info = "我的名字是" + name + "，年龄" + age;
console.log("我的名字是" + name + "，今年龄" + age);
console.log(info, "9999999999");

// 5. 模板字符串
const aaa = 16;
const infoo = `我的名字是${name}，今年龄${aaa}`;
console.log(infoo, "这是模板字符串");

// 6. indexOf 查找字符串第一次出现的位置
console.log(str1.indexOf("1"), "这是字符串1中1第一次出现的位置");
console.log(str2.indexOf("Script"), "这是字符串2中Script第一次出现的位置");

// 7. includes：判断字符串中是否包含某个字符
console.log(str1.includes("lol"), "这是字符串1中是否包含1");
console.log(str2.includes("Script"), "这是字符串2中是否包含Script");

// 8. slice: 截取字符串的一部分
const str3 = "as asjjj ";
console.log(str3.slice(1, 4), "这是字符串3中截取的部分");

// 9. trim: 去掉字符串前后的空格
const str4 = "   as454545as   ";
console.log(str4.trim(), "这是字符串4中前后空格被去掉的部分");