//引入express
//用来分发路由
const express = require('express');

//引入学生路由
const homePage = require('./homePage')
//定义路由
const router = express.Router();

router.use('/',homePage);


module.exports  = router;