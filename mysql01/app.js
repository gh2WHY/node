const express = require('express');
//引入mysql
const mysql = require('mysql');

const app = express();

//处理post请求的参数
app.use(express.urlencoded());
app.use(express.json());

// Create a pool and use it direct
const pool = mysql.createPool({
    connectionLimit:10,  //连接池的数量
    host:'localhost',    //访问的地址
    user:'root',
    password:'root',
    database:'students'
})
app.get('/' ,(req,res) => {
    res.send('123');
})


//RESTfu路由风格
app.get('/students',(req,res) => {
    // res.send('获取学生信息');
    pool.getConnection(function(err, connection) {
        //有错误就抛出错误
        if (err) throw err;
        console.log('数据库连接成功');
        // 没有错误即说明说数据库连接成功,就可以对数据库进行操作了
        // connection.query('SELECT * FROM student', function (error, results, fields) {
        //     if (error) throw error;
        //     //1. 查询数据
        //     //1.1 查询数据库所有信息
        //     res.json(results);
        // });

        //1.2 询指定列数据
        //没有错误即说明说数据库连接成功,就可以对数据库进行操作了
        // connection.query('SELECT name as studentname,age FROM student', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.3 查询满足条件的行
        // connection.query('SELECT *  FROM student where age > 20', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.4 指定查询范围
        // connection.query('SELECT * FROM student where age between 19 and 20', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.5 查询不在某范围内的数据
        // connection.query('SELECT * FROM student where age not between 19 and 21', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.6 枚举类型
        // connection.query('SELECT * FROM student where age in (17,19)', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.7 模糊查询
        // connection.query('SELECT * FROM student where name like "%欢%"', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.8 多重条件查询
        // connection.query('SELECT * FROM student where age > 20 && sex ="女"', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });

        //1.9 对查询结果进行排序
        // connection.query('SELECT * FROM student where age > 18  order by id DESC', function (error, results, fields) {
        //     if (error) throw error;
        //     res.json(results);
        // });
    });


})

app.post('/students',(req,res) => {
    // res.send('新增学生信息');
    console.log(req.body);
    let {name,id,birth,age,sex} = req.body;
    birth = birth && new Date(birth).getTime();
    // console.log(name,id,sex,birth,age);
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        connection.query('INSERT INTO student (name,age,sex,birth,id) values (?,?,?,?,?)',[name,age,sex,birth,id] ,function (error, results, fields) {
            if (error) throw error;
            res.send('数据插入成功');
        });
    });
})

app.put('/students/:id',(req,res) => {
    // res.send('修改学生信息');
    let {id} = req.params;
    console.log(id)
    let student = req.body
    console.log(student)
    let data = []
    for(let key in student){
        data.push(key,student[key])
    }
    data.push(id)
    console.log(data)
    // res.send("更新学生信息")
    pool.getConnection(function(err, connection) {
        // 有报错就抛出报错
        if (err) throw err; // not connected!
        // 更新数据
        connection.query(`UPDATE student SET ?? = ? WHERE id = ?`,data, function (error, results, fields) {
            // 查询数据库有错误就抛出错误
            // console.log(error)
            if (error) throw error;
            res.send("数据更新成功")
        });
    });
})

app.delete('/students',(req,res) => {
    // res.send('删除学生信息');
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        connection.query('delete from student where id = 5', function (error, results, fields) {
            if (error) throw error;
            res.send('数据删除成功')
        });
    });
})

app.listen(3000,()=> {
    console.log('server start at 3000 port');
})