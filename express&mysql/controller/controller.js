//引入数据
const {getStudent} = require('../model/db')
//引入moment模块
const moment = require('moment');

//向页面中渲染数据库中的所有信息
exports.getStudent = (req,res) => {
      getStudent((results) => {
          // console.log(results);
          //将生日中的毫米数转化为YYYY-MM-DD的形式
          results.forEach((item)=> {
              item.birth = moment(parseInt(item.birth)).format("YYYY-MM-DD");
              // console.log(item);
          })
          res.render('showindex',{
              results
          });
      });

}