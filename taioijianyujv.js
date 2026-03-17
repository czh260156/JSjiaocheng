// if 语句
const age = 20;
if (age >= 18) {
    console.log("已成年++++++++++++++++");
}

// if-else 语句
const score = 580;
if (score >= 60) {
    console.log("通过");
} else {
    console.log("没通过");
}

// if-else-if-else 语句
const grade = 65;
if (grade >= 90) {
    console.log("优秀");
} else if (grade >= 80) {
    console.log("良好");
} else if (grade >= 70) {
    console.log("中等");
} else if (grade >= 60) {
    console.log("合格");
} else {
    console.log("不及格");
}

// switch 语句
const day = 7;
switch (day) {
    case 1:
        console.log("周一");
        break;
    case 2:
        console.log("周二");
        break;
    case 3:
        console.log("周三");
        break;
    case 4:
        console.log("周四");
        break;
    case 5:
        console.log("周五");
        break;
    case 6:
    case 7:
        console.log("周末");
        break;
    default:
        console.log("无效的日期");
}

// 三目运算符：是if---else的简写
const temperature = 50;
const a = 100;
const b = 20;
const result = temperature > 25 ? (a > b ? "too hot" : 666) : "凉快";
console.log(result, '三目运算符结果++++++++++++++');
console.log("条件语句++++++++++++++++");