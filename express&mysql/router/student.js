//引入express
//用来分发路由
const express = require('express');

//引入控制器
const controller = require('../controller/controller')
const router = express.Router();

//获取所有学生信息
router.get('/student',controller.getAllStudent);
//获取单个学生信息
router.get('/student/:id',controller.getStudent);


//获得新增学生信息页面
router.get('/addStudent',controller.showAddStudent);

router.post('/student',controller.addStudent)


//得到修改学生信息的页面
router.get('/update/:id',controller.showUpStudent)


router.post('/updateStudent/:id',controller.updateStudent)

router.get('/delStudent/:id',controller.delStudent)

module.exports  = router;