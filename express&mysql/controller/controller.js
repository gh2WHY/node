//引入数据
const {getStudent,addStudent,updateStudent,deleteStudent} = require('../model/db')
//引入moment模块
const moment = require('moment');

//向页面中渲染数据库中的所有学生信息
exports.getAllStudent = (req,res) => {
      getStudent()
      .then((results) => {
          // console.log(results);
          //将生日中的毫米数转化为YYYY-MM-DD的形式
          results.forEach((item)=> {
              item.birth = moment(parseInt(item.birth)).format("YYYY-MM-DD");
              // console.log(item);
          })
          res.render('showindex',{
              results
          });
      })
}

//获取单个学生信息
exports.getStudent = (req,res) => {
    let {id} = req.params;
    console.log(id)
    getStudent(id)
        .then((results) => {
            // console.log(results);
            //将生日中的毫米数转化为YYYY-MM-DD的形式
            results.forEach((item)=> {
                item.birth = moment(parseInt(item.birth)).format("YYYY-MM-DD");
                // console.log(item);
            })
            console.log(results)
            res.render('showindex',{
                results
            });
        })
}

//新增学生信息页面
exports.showAddStudent = (req,res) => {
    res.render('addStudent')
}

//处理新增学生信息
exports.addStudent = (req,res) => {
    // console.log(req.body);
    let StuInfo = req.body;
    console.log(StuInfo)
    addStudent(StuInfo)
    .then((result) =>{
        if(result.affectedRows){
            // res.send("成功添加学员")
            res.render("showInfo",{
                title:'新增信息',
                handle1:"新增",
                info:"成功添加学员"
            })
        }
    }).catch((err) => {
            res.render("showInfo",{
                title:'新增信息',
                handle1:"修改",
                info:"新增学员失败"
        })
        // res.send('添加信息失败')
    })
}

//修改学生信息页面
exports.showUpStudent = (req,res) => {
    let {id} = req.params;
    let student = req.body;
    console.log(id,student);
    getStudent(id)
        .then((results) => {
            // console.log(results);
            //将生日中的毫米数转化为YYYY-MM-DD的形式
            results.forEach((item)=> {
                item.birth = moment(parseInt(item.birth)).format("YYYY-MM-DD");
                // console.log(item);
            })
            // console.log(results)
        // [
        // RowDataPacket {
        //      id: 1,
        //      name: '沛沛',
        //      age: 19,
        //      sex: '女',
        //      birth: '2001-09-07'
        //     }
        // ]

            res.render('updateStudent',{
                id : results[0].id,
                stuName : results[0].name,
                age : results[0].age,
                sex : results[0].sex,
                birth : results[0].birth,
            });
        })

}

//处理修改学生信息
exports.updateStudent = (req,res) => {
    let {id} = req.params;
    let info = req.body;
    // console.log(id);
    // console.log(info);
    updateStudent(id,info)
        .then((result) =>{
            if(result.affectedRows){
                // res.send("成功添加学员")
                res.render("showInfo",{
                    title:'修改信息',
                    handle1:"修改",
                    info:"成功修改学员信息"
                })
            }
        }).catch((err) => {
        res.render("showInfo",{
            title:'修改信息',
            handle1:"修改",
            info:"修改学员失败"
        })
        // res.send('添加信息失败')
    })
}


//删除信息
exports.delStudent = (req,res) => {
    let {id} = req.params;
    console.log(id);
    deleteStudent(id)
        .then((results)=> {
            console.log(results);
            res.render("showinfo",{
                title:'删除信息',
                handle1:"删除",
                info:"删除学员成功"
            })
        }).catch((err)=> {
        res.render("showinfo",{
            title:'删除信息',
            handle1:"删除",
            info:"删除学员失败"
        })
    })
}