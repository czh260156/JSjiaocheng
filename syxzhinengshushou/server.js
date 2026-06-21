import express from 'express'; // 导入 Express 框架，用于构建 Web 服务器
import cors from 'cors'; // 导入 CORS 中间件，用于处理跨域请求
import OpenAI from 'openai'; // 导入 OpenAI 官方库，用于与 OpenAI API 交互
import { fileURLToPath } from 'url'; // 导入 url 模块的 fileURLToPath 函数，用于将文件 URL 转换为路径
import { dirname, join } from 'path'; // 导入 path 模块的 dirname 和 join 函数，用于处理文件和目录路径

// 服务器启动提示
console.log('===== 服务器初始化开始 =====');

// 获取当前模块文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块文件所在的目录路径
const __dirname = dirname(__filename);
// 在控制台打印当前目录路径
console.log(`当前目录: ${__dirname}`);

// 创建一个 Express 应用实例
const app = express();
// 设置服务器监听的端口号，优先使用环境变量 PORT，否则默认为 3000
const port = process.env.PORT || 3000;
// 在控制台打印将要使用的端口号
console.log(`使用端口: ${port}`);

// 中间件配置
// 启用 CORS 中间件，允许所有来源的跨域请求
app.use(cors());
// 启用 Express 内置的 JSON 解析中间件，用于解析请求体中的 JSON 数据
app.use(express.json());
// 启用 Express 内置的静态文件服务中间件，将 'public' 目录下的文件对外提供访问
app.use(express.static(join(__dirname, 'public')));
// 在控制台打印中间件配置完成的消息
console.log('中间件配置完成');

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: "sk-10eaff8d5bd34e02968c1e690c3ea956", // 设置你的 API 密钥
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1" // 设置 API 请求的基础 URL，这里指向兼容 OpenAI 的阿里云 DashScope 服务
});
// 在控制台打印 OpenAI 客户端初始化完成的消息
console.log('OpenAI客户端初始化完成');

// 定义处理聊天请求的 API 端点，路径为 /api/chat，使用 POST 方法
app.post('/api/chat', async (req, res) => { // 使用 async 关键字，因为内部有异步操作 (await)
  // 收到新的聊天请求时，输出提示信息
  console.log('\n===== 收到聊天请求 =====');
  // 记录请求时间，便于日志查看
  console.log(`请求时间: ${new Date().toLocaleString()}`);
  
  try {
    // 从请求体 (req.body) 中解构出 messages 数组
    const { messages } = req.body;
    // 输出接收到的消息提示
    console.log('接收到的消息:');
    // 遍历 messages 数组，打印每条消息的角色和内容的前30个字符
    messages.forEach((msg, i) => {
      console.log(`[${i}] ${msg.role}: ${msg.content.substring(0, 30)}...`); // 使用 substring 截断长消息，避免控制台输出过多
    });
    
    // 输出正在调用AI的提示
    console.log('调用AI接口中...');
    // 调用 OpenAI (或兼容的) API 的 chat.completions.create 方法来获取 AI 回复
    const completion = await openai.chat.completions.create({ // 使用 await 等待异步操作完成
      model: "qwen-plus", // 使用通义千问Plus模型
      messages: [ // 传递给 AI 的消息列表
        { role: "system", content: "你是一个友好、专业和有帮助的AI助手。" }, // 添加系统指令，设定AI的行为和角色
        ...messages // 将用户发送的消息数组展开并包含在内
      ],
    });
    
    // AI接口调用成功的提示
    console.log('AI接口调用成功');
    // 从 API 返回的 completion 对象中提取 AI 的回复内容
    const aiResponse = completion.choices[0].message.content; // choices[0] 表示获取第一个选项的回复
    // 从 API 返回的 completion 对象中提取 AI 的角色 (通常是 'assistant')
    const aiRole = completion.choices[0].message.role;
    // 输出AI回复的角色和内容预览
    console.log(`AI回复(${aiRole}): ${aiResponse.substring(0, 50)}...`);
    
    // 将 AI 的回复内容和角色封装成 JSON 对象，发送回客户端浏览器
    res.json({ 
      message: aiResponse, // AI 的回复消息
      role: aiRole // AI 的角色
    });
    // 输出回复已发送的消息
    console.log('AI回复已发送给用户浏览器');
    
  } catch (error) {
    // 发生错误时，输出错误提示
    console.error('===== API调用错误 =====');
    // 输出错误类型
    console.error('错误类型:', error.name);
    // 输出详细错误信息
    console.error('错误消息:', error.message);
    
    // 向前端返回错误信息，状态码500表示服务器内部错误
    res.status(500).json({ 
      error: '处理请求时出错', // 一般性错误提示
      details: error.message // 详细错误信息
    });
    // 输出错误信息已发送的提示
    console.error('错误信息已发送给用户浏览器');
  } // try...catch 结束
}); // API 端点定义结束

// 启动服务器，开始监听指定端口上的连接请求
app.listen(port, () => { // 提供一个回调函数，在服务器成功启动后执行
  // 服务器成功启动后的提示信息
  console.log('\n===== 服务器启动成功 =====');
  // 输出服务器访问地址
  console.log(`服务器运行在 http://localhost:${port}`);
  // 等待用户访问的提示
  console.log('等待用户访问聊天界面...');
}); // 服务器启动结束