const express = require('express');

const app = express();

app.set('views engine','ejs');


app.get('/',(req,res) => {
    res.render('index',{
        title:'我是小可爱!!!',
        isTrue:false,
    })
})

app.get("/user", (req,res) =>{
    res.render("index",{
        title:"用户",
        isTrue:false,
        arr:['彭昱畅','刘昊然','李钟硕'],
    })
})
app.listen(3000,()=> {
    console.log('server start at 3000 port');
})