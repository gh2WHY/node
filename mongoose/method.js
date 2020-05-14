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
UserSchema.statics.findByAge = function(age) {
    console.log(this);  //Model { students }  静态方法中的this指代这个数据集合,就是students
    this.find({age},(err,data)=>{
        if(err) {
            console.log(err);
        }
        console.log(data);
    })
}



//通过静态方法去修改数据
UserSchema.statics.ChangeAgeByName = function(name) {
    this.find({name},(err,data)=> {
        let result = data[0];
        // console.log(result)
        if(err) {
            console.log(err)
        }
        if(result.sex == "男") {
            result.sex = "女";
        }else {
            result.sex = "男";
        }
        result.save();
    })
}

//创建一个类
let User = mongoose.model("students",UserSchema);

//实例化类
let user = new User({
    name:"大刘",
    age:22,
    sex:"男",
})
//静态方法调用
// User.findByAge(22);

User.ChangeAgeByName('大刘');

// //保存叔叔
// user.save().then(result=> {
//     console.log(result)
// }).catch(err=> {
//     console.log(err);
// })
