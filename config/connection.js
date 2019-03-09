// var mysql = require("mysql");

// var connection;

// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     connection = mysql.createConnection({
//     host: "127.0.0.1", 
//     port: 8889, 
//     user: "root", 
//     password: "root", 
//     database: "burger_db", 

// });
// };

// connection.connect(function(err) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//     }
//     console.log("connection as id " + connection.threadId);
// });

// module.exports = connection;