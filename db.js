// db.js
const mysql = require('mysql2');

// 创建一个连接池
const pool = mysql.createPool({
    host: 'localhost',    // 数据库主机
    user: 'root',         // 数据库用户名
    password: 'password', // 数据库密码
    database: 'your_database_name' // 数据库名称
});

// 连接池的promise API
const promisePool = pool.promise();

module.exports = promisePool;
