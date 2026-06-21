// 当DOM完全加载后执行脚本
document.addEventListener("DOMContentLoaded", function () {
  // 获取聊天消息显示区域的DOM元素
  const chatMessages = document.getElementById("chat-messages");
  // 获取用户输入框的DOM元素
  const userInput = document.getElementById("user-input");
  // 获取发送按钮的DOM元素
  const sendBtn = document.getElementById("send-btn");

  // 创建一个数组存储对话历史
  let messages = [
    {
      role: "assistant", // 指定消息角色为AI助手
      content:
        "你好！我是基于阿里云通义千问大模型的AI助手。有什么我可以帮你的吗？", // 初始欢迎消息
    },
  ];

  // 定义发送消息的函数
  function sendMessage() {
    // 获取并清理用户输入的内容，去除首尾空格
    const userMessage = userInput.value.trim();
    // 如果用户没有输入内容，则不执行后续操作
    if (!userMessage) return;

    // 清空输入框
    userInput.value = "";
    // 将焦点重新设置到输入框
    userInput.focus();

    // 将用户消息添加到聊天界面
    appendMessage("user", userMessage);

    // 将用户消息添加到对话历史数组
    messages.push({ role: "user", content: userMessage });

    // 创建一个显示加载动画的DOM元素
    const loadingDiv = document.createElement("div");
    // 设置加载动画的样式类
    loadingDiv.className = "message assistant";
    // 设置加载动画的HTML内容
    loadingDiv.innerHTML = `
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    // 将加载动画添加到聊天界面
    chatMessages.appendChild(loadingDiv);

    // 使聊天界面滚动到底部，显示最新消息
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 使用axios库发送POST请求到后端API
    axios.post('/api/chat', {
      messages: messages // 发送所有对话历史
    })
      .then((response) => {
        // 请求成功后，移除加载动画
        chatMessages.removeChild(loadingDiv);

        // 将AI助手的回复添加到聊天界面
        appendMessage("assistant", response.data.message);

        // 将AI助手的回复添加到对话历史数组
        messages.push({ role: response.data.role, content: response.data.message });
      })
      .catch((error) => {
        // 请求失败时，移除加载动画
        chatMessages.removeChild(loadingDiv);

        // 设置默认错误消息
        let errorMessage = "网络响应出错";
        if (error.response) {
          // 如果服务器返回了错误状态码
          errorMessage = `服务器错误: ${error.response.status}`;
          // 如果服务器返回了详细的错误信息，则使用该信息
          if (error.response.data && error.response.data.details) {
            errorMessage = error.response.data.details;
          }
        } else if (error.request) {
          // 如果请求已发送但没有收到响应
          errorMessage = "服务器无响应";
        } else {
          // 如果在请求设置时出现错误
          errorMessage = error.message;
        }
        
        // 在聊天界面显示错误消息
        appendMessage("assistant", `抱歉，发生了错误：${errorMessage}`);
      });
  }

  // 定义将消息添加到聊天界面的函数
  function appendMessage(sender, content) {
    // 创建一个新的消息DOM元素
    const messageDiv = document.createElement("div");
    // 根据发送者设置不同的样式类
    messageDiv.className = `message ${sender}`;
    // 设置消息的HTML内容，并应用格式化
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${formatContent(content)}</p>
      </div>
    `;
    // 将消息添加到聊天界面
    chatMessages.appendChild(messageDiv);

    // 使聊天界面滚动到底部，显示最新消息
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 定义格式化消息内容的函数
  function formatContent(content) {
    return content
      .replace(/\n/g, "<br>") // 将换行符转换为HTML的换行标签
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // 将URL转换为可点击的链接
  }

  // 为发送按钮添加点击事件监听器
  sendBtn.addEventListener("click", sendMessage);

  // 为输入框添加键盘事件监听器，按下Enter键(不按Shift)发送消息
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 阻止默认行为（换行）
      sendMessage(); // 发送消息
    }
  });

  // 为输入框添加输入事件监听器，自动调整文本框高度
  userInput.addEventListener("input", function () {
    this.style.height = "auto"; // 先将高度设为自动
    this.style.height =
      this.scrollHeight < 120 ? this.scrollHeight + "px" : "120px"; // 设置高度，但最大不超过120px
  });
});