/*
这里我们选择nodejs-express框架做后端渲染驱动。
*/

// 选择ts语法开发

const express = require("express");

const app = express();
const port: number = 3000;
const host: string = "127.0.0.1";

// 导入静态资源包，
app.use("public", express.static("public"));

app.get("/", (req, res) => {
  res.send("测试根路径");
});

// 启动nodemon app.js 可以监听文件改动
app.listen(port, host, () => {
  console.log(`Example app listening on port http://${host}:${port}`);
});
