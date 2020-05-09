//引入express
//用来分发路由
const express = require('express');

//引入控制器
const controller = require('../controller/controller')
const router = express.Router();

router.get('/',controller.getStudent);

router.post('/',(req,res) => {
    res.send('增加学生信息');
})

router.put('/',(req,res) => {
    res.send('修改学生信息');
})

router.delete('/',(req,res) => {
    res.send('删除学生信息');
})
module.exports  = router;