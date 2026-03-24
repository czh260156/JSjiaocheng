// 1. 什么是对象
// 对象是属性和方法的集合，对象可以保存一个事物的多个信息
const user = {
    name: 'syxy',
    age: 20,
    city: '三亚'
}

console.log(user, 'usr 对象');

// 2. 使用:访问对象的属性
console.log(user.name, '++++user.name 属性');
console.log(user.age, '++++user.age 属性');
console.log(user.city, '+++user.city 属性');

// 4. 修改属性
user.name = 'aaaaaaa';
console.log(user, '修改属性后 user 对象');

// 5. 添加属性
user.shengao = 180;
user.gender = '男';
console.log(user, '添加属性后 user 对象');

// 6. 删除属性
delete user.gender;
console.log(user, '删除属性后 user 对象');

// 7. 创建对象
const user1 = new Object();
user1.name = 'syxy222';
user1.age = 2033;
user1.city = '三亚';
console.log(user1, '创建对象 user1 ');

// 8. 创建对象
const user2 = {};
user2.name = 'sy121xy';
user2.age = 2021212;
user2.city = '三亚121';
console.log(user2, '创建对象 user2 ');

// 9. 对象中的方法
const person = {
    name: '里斯',
    sayHello: function () {
        console.log('hello world' + this.name);
    }
}

person.sayHello();

// 10 for....in 遍历对象
for (let key in user1) {
    console.log(key, user1[key], 'for...in 遍历对象');
}

// 11.Object.keys()和Object.values()
console.log(Object.keys(user2), 'Object.keys() 获取对象所有的键');
console.log(Object.values(user2), 'object.values() 获取对象所有的值');

// 12 in 判断属性是否存在
console.log('naime' in user, 'in 判断属性是否存在');
console.log('city' in user, 'in 判断属性是否存在');