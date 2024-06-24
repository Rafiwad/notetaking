const mysql = require('mysql2');
const dbconfig = require('./dbconfig.js');



//open connection
connection.connect(console.error => {
    if (error) {
        console.error('Error connecting to database: ', + error.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});