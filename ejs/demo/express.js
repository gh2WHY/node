const express = require('express');

const app =express();

// 设置默认的模板,此时express将会帮你引入ejs,
// 所以你的提前安装ejs
app.set("views engine", "ejs");

app.get("/",(req,res) =>{
    // 渲染index.ejs模板, 第二个参数是向模板中添加的数据
    res.render("index",{
        title:'test'
    })
})

app.listen(3000,()=> {
    console.log('server start at 3000 port');
})