//引入express
//用来分发路由
const express = require('express');

//引入控制器
const controller = require('../controller/index')
const router = express.Router();




//获取所有学生信息
router.get('/',(req,res)=> {
    res.render('pageHome')
});
//获取单个学生信息

//base64页面
router.get('/base',controller.base);

//sha1页面
router.get('/sha1',controller.sha1);

router.get('/md5',controller.md5);

module.exports  = router;