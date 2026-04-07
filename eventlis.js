const button = document.querySelector('button');

button.addEventListener("click", function () {
    alert("Clicked!");
});

button.addEventListener('click', function (event) {
    console.log("事件类型：", event.type);
    console.log("事件对象：", event);
    console.log("当前元素：", event.currentTarget);
    console.log("鼠标位置：", event.clientX, event.clientY);
});

button.addEventListener('click', function () {
    alert('按钮在冒泡阶段被点击！');
}, false);

button.addEventListener('click', function () {
    alert('按钮在捕获阶段被点击！');
}, true);

const ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        alert(`点击了${event.target.textContent}个li列表项`);
    }
});