const mysql = require("mysql");
var connection = mysql.createPool({
    connectionLimit : process.env.DB_CLIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // multipleStatements: true
})
connection.getConnection(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL!");
});

module.exports = connection;