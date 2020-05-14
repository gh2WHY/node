const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/student',{
    useUnifiedTopology: true ,
    useNewUrlParser: true
});

//定义scheme
let UserSchema = mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
},{versionKey:false})

// 静态方法通过Schema上的statics属性定义
UserSchema.statics.findByAge = function(age,callback) {
    console.log(this);  //Model { students }  静态方法中的this指代这个数据集合,就是students
    this.find({age},(err,data)=>{
        //返回查询到的数据
      callback(data);
    })
}

//使用promise方法改写
// UserSchema.statics.findByAge = function(age)  {
//     return new Promise((reslove,reject) => {
//       this.find({age},(err,data)=> {
//           if(err) {
//               reject(err);
//           }
//           reslove(data);
//       })
//     })
// }

//定义动态方法
UserSchema.methods.fun = function(){
    console.log(`哈喽,我的名字是${this.name},我今年${this.age}岁了`);
}

//创建一个类
let User = mongoose.model("students",UserSchema);

//先调用静态方法找到数据
User.findByAge(22,function (result) {
    console.log(result);
    let user = result[0];
    user.fun();
})

//.then方法
// User.findByAge(22)
// .then(result=> {
//     console.log(result);
//     let user = result[0];
//     user.fun();
// })