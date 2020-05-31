var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'ghkdduswn123',
    database: 'YanPlaner'
});

module.exports = connection;