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