/*
这里我们选择nodejs-express框架做后端渲染驱动。
*/
// 选择ts语法开发
var express = require("express");
var app = express();
var port = 3000;
var host = "127.0.0.1";
// 导入静态资源包，
app.use("public", express.static("public"));
app.get("/", function (req, res) {
    res.send("测试根路径");
});
// 启动nodemon app.js 可以监听文件改动
app.listen(port, host, function () {
    console.log("Example app listening on port http://".concat(host, ":").concat(port));
});
