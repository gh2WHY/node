const mongoose = require('mongoose');

//连接数据库
mongoose.connect("mongodb://localhost/student",{
    useUnifiedTopology: true ,
    useNewUrlParser: true
});

//创建schema
let Schema = new mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
},{versionKey:false})

//创建类
const Student =  mongoose.model('user',Schema,'why');

const why= new Student({
    name:"hongyu",
    age:18,
    sex:'女',
});
why.save().then(result=>{
    console.log(result)
}).catch(err=> {
    console.log(err);
})