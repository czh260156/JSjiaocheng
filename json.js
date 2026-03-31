// js对象
const user = {
    name: 'zhangsan',
    age: 18,
    city: 'beijing'
}

console.log(user, "js 对象");

// json.stringify():把js对象转成json字符串
const jsonStr = JSON.stringify(user);
console.log(jsonStr, "json字符串");
console.log(typeof jsonStr, "json字符串类型");

// json.parse():把json字符串转回js对象
const obj = JSON.parse(jsonStr);
console.log(obj, "转回对象");
console.log(typeof obj, "转回对象类型");

// 转回来之后可以继续访问属性
console.log(obj.name, '对象中的name');
console.log(obj.age, '对象中的age');

// json也可以表示数组
const arr = ["apple", "banana", "orange"];
const arrJson = JSON.stringify(arr);
console.log(arr, "js数组");
console.log(arrJson, "json数组");

const newArr = JSON.parse(arrJson);
console.log(newArr, "转回数组");

// json特点: json中的键名通常要用双引号
const json = '{"title": "jsjsjsj", "price": 666, "order": "adad"}';
console.log(json, "json字符串");
console.log(typeof json, "json字符串类型");

const obj2 = JSON.parse(json);
console.log(obj2, "转回对象");
