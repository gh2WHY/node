const express = require('express');

const app = express();

app.get('/json',(req,res) => {
   res.json({
       title:'首页',
       data:['彭昱畅','李钟硕','刘昊然'],
   })
})

app.use(express.static('public'));
app.listen(3000,() => {
    console.log('server start at 3000');
})