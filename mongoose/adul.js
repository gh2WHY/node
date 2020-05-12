//引入mongoose
const mongoose = require('mongoose');

//链接数据库
mongoose.connect("mongodb://localhost/student",{
    useUnifiedTopology: true ,
    useNewUrlParser: true
},function (err) {
    if(err) {
        throw err;
    }else{
        console.log('数据库连接成功');
    }
});

//创建schema
const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
})

//定义类
const student = mongoose.model('students',studentSchema);

// //实例化类
// const guisheng = new student({
//     name:"周贵生",
//     age:20,
//     sex:'男',
// })
//
// guisheng.save().then(result=> {
//     console.log(result);
// }).catch(err=> {
//     console.log(err);
// })

//查询数据
// student.find(function () {
//     console.log(arguments);
// })

//查询结果是数组
// student.find({$or:[{age:25},{name:'小刚'}]})
// .then(result=> {
//     console.log(result)
// }).catch(err=> {
//     console.log(err);
// });

//查询符合条件的第一条数据
// student.findOne({age:21})
//     .then(result=> {
//         console.log(result)
//     }).catch(err=> {
//     console.log(err);
// });

//通过id查询数据
//// findById 找出来的数据是一个对象,因为只是找一个数据
// student.findById('5eba0f32cc744e0658091d9f',function (err,data) {
//     if(err) {
//         console.log(err);
//     }
//     console.log(data);
// })

//增加数据
// const zhenhui = new student({
//     name:"蔡振华",
//     age:22,
//     sex:'男',
// })
//
// zhenhui.save();


//修改数据
// student.findById('5eba0f32cc744e0658091d9f')
//     .then(result=> {
//         console.log(result);
//         result.name = "朱莉";
//         result.age = 29;
//         result.save()
//             .then(data=> {
//                 console.log(data);
//             }).catch(err=> {
//             console.log(err);
//         })
//     }).catch(err=> {
//     console.log(err);
// })

//删除数据
// student.findById('5eba0f32cc744e0658091d9f')
//     .then(data=> {
//         console.log(data);
//         data.remove()
//             .then(data=> {
//                 console.log('数据删除成功');
//             }).catch(err=> {
//             console.log('数据删除失败')
//         })
//     }).catch(err=> {
//     console.log(err);
// })
//回调函数的方式
// student.findById('5eba54820860223c98a64b8f',function (err,data) {
//     if(err) {
//         console.log(err);
//     }
//     console.log(data);
//     data.remove((err,data)=> {
//         if(err) {
//             console.log('数据删除失败');
//         }
//         console.log('数据删除成功')
//     })
// })
