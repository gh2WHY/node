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

//新增学员模型
exports.getStudent = (callback) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM student', function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
    });
}