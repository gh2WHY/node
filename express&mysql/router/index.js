//引入express
//用来分发路由
const express = require('express');

//引入学生路由
const studentRouter = require('./student')
//定义路由
const router = express.Router();

router.use('/',studentRouter);


module.exports  = router;