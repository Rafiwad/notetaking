const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dbConfig = require('./db.config.js');

const app = express();
const port = 3000;

/* Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tygerhubinc',
  password: 'Rafiw@11/Adams/',
  database: 'notes_app'
});
*/


//create database connection
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,

});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//get all notes
app.get('/notes', (req, res) => {
    connection.query('SELECT * FROM notes', (err, results) => {
        if (err) {
            console.error('Error fetching notes:' + err.stack);
            res.status(500).send('Error retrieving notes from d');
            return;
        }
        res.json(results);
    });
});

/*add a new note
app.post('/api/notes', (req, res)=>{
    const {name, content} = req.body;
    connection.query('SELECT INTO notes (name, content) VALUES (?, ?)', [name, content], (err, results) => {
        if (err) {
            console.error('Error adding notes:', err.stack);
            res.status(5).send('Error adding notes');
            return;
        }
        res.status(201).send('Notes added successfully');
    });
});
 */

app.listen(port, ()=> {
    console.log(`Server is running on  http://localhost:${port}`);
});