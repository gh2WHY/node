//引入mongoose
const mongoose = require('mongoose');

//链接数据库
mongoose.connect("mongodb://localhost/student",{
    useUnifiedTopology: true ,
    useNewUrlParser: true
});

//创建schema.首先规定一下集合中的字段
// 可以在创建Schema的时候通过第二个参数{versionKey:false}关闭数据中的_v字段
let Schema = new mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
},{versionKey:false})

//创建一个模型,就是一个类
const Student = mongoose.model("students",Schema);

//实例化对象
const xiaozhan = new Student ({
    name:"肖战",
    age:26,
    sex:"男",
})

//保存对象
xiaozhan.save();