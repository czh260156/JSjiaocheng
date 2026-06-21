// 1. 什么是bom, bom是浏览器对象模型, js可以通过bom操作浏览器窗口
if (typeof window !== "undefined") {
    console.log("当前环境是浏览器");

    // 2. window
    console.log(window, "window对象");

    // 3. alert
    // alert("这是个提示框");

    // 4. location
    console.log(location, "location对象");
    console.log(location.href, "当前页面的地址");

    // 5. navigator
    console.log(navigator, "navigator对象");
    console.log(navigator.userAgent, "浏览器信息");

    // 6. setTimeout
    setTimeout(() => {
        console.log("111111秒后执行");
    }, 1000);

    // 7. setInterval
    let count = 0;
    const timer = setInterval(() => {
        count++;
        console.log(count, "每1秒执行一次");

        if (count === 3) {
            clearInterval(timer);
        }
    }, 1000);
} else {
    console.log("bom.js代码需要在浏览器环境中执行");
}