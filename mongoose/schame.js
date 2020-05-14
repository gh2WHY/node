//引入mongoose
const mongoose = require('mongoose');

//链接数据库
mongoose.connect("mongodb://localhost/student",{
    useUnifiedTopology: true ,
    useNewUrlParser: true
});

//创建schema.首先规定一下集合中的字段
//schame可以指定默认字段
let Schema = new mongoose.Schema({
    name: {
        type: String,
        trim:true, //自动删除输入姓名中的空格
    },
    age:{
        type:Number,
        // default:18, //设置默认值(静态)
        required:true,
        max:60,  //年龄的最大值为60
        min:18,  //年龄的嘴小值为18
    },
    sex:String,
    email:{
        type:String,
        match: /(.+)@(.+)\.["com"| "cn"]/g, //正则匹配
    },
    status: {
        type:String,
        enum:['success','false'],     //输入的字符串只能是seccessfalse
    }
})

//创建一个模型,就是一个类
const Student = mongoose.model("students",Schema);

//实例化对象
const rong  = new Student ({
    name:'   李荣荣    ',
    age:21,
    sex:'男',
    status:"success",
    email:"123456@qq.com"
})

//保存对象
rong.save().then(results=> {
    console.log(results);
}).catch(err=> {
    console.log(err);
});