//主应用程序入口
const express = require('express');
const router = require('./router');
const app = express();

//配置模板引擎
app.set("view engine","ejs");

//处理post请求的参数
app.use(express.urlencoded());
app.use(express.json());


//引入路由模块
app.use(router);

app.listen(3000,()=>{
    console.log('server start at 3000 port');
})