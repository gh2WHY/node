//和数据库相关的操作
const mysql = require('mysql');

//连接池
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'students'
});

//获取学员信息模型
exports.getStudent = (id) => {
    let sql = "SELECT * FROM student WHERE 1 = 1"
    if(id){
        sql += ` and id = ${id}`
    }
    console.log(sql);
    return new Promise((resolve ,reject)=> {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
        });
    })
}

//添加学生信息模型
exports.addStudent = (StuInfo) => {
    let {id,name,age,sex,birth} = StuInfo;
    // console.log(id,name,age,sex,birth)
    birth = new Date(birth).getTime();
    // console.log(birth)
    let sql = `insert into student (id,name,age,sex,birth) values (${id},"${name}",${age},"${sex}",${birth})`
    // console.log(sql)
    return new Promise((resolve ,reject)=> {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                if (error) reject (error);
                resolve(results);
            });
        });
    })
}

//修改学生信息模型
// 更新学生信息的模型
exports.updateStudent = (id,student) =>{
    let {name,age,sex,birth} = student;
    birth = new Date(birth).getTime()
    // console.log(birthday)
    let sql = `update student set name = "${name}",age = "${age}",sex ="${sex}", birth = "${birth}" where id = ${id }`
    return new Promise((resolve,reject) => {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        });
    })
}

//删除信息模型
exports.deleteStudent = (id) =>{
    let sql = `delete from student where id = ${id}`;
    return new Promise((resolve,reject) => {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        });
    })
}