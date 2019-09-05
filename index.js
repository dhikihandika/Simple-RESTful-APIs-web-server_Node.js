// -------------------------------------------------------------------------------------------------------------------------------------------------------//
// ---------------------------------------------------------------- Create Web Server --------------------------------------------------------------------//
// ----------------------------------------------------------------    RESTful APIs   --------------------------------------------------------------------//
// -------------------------------------------------------------------------------------------------------------------------------------------------------//
// ------------------------------------------------------ //
// date create : 27, August 2019
// author      : dhikihandika
// email       : dhikihandika36@gmail.com
// ------------------------------------------------------ //


// -------------------------------------------------------|         Initialize Program          |-------------------------------------------------------- //
const mysql = require('mysql');                                     // Acces module MySQL database
const express = require('express');                                 // Acces module express.js 
var app = express();                                                // Define variable 'app' its express function
const bodyParser = require('body-parser');                          // Acces module body-parser

app.use(express.json());
app.use(bodyParser.json());     

// Make server can be get with different origin/domain CORS (Cross Origin Resource Sharing)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");                                                 // Acces database can be get in different origin (domain)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   // Set header in Access-Contorl-Allow Cross Origin Resource Sharing
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");                           // Set methode in Access-Contorl-Allow Cross Origin Resource Sharing
    next();
});     

var conn = mysql.createConnection({                                 // Function to create connection with database MySQL
    host: 'localhost',                                              // Default host
    user: 'root',                                                   // Default user
    password: '',                                                   // Default pass
    database: 'davis_db'                                            // "reports_db" database
});
// callback function connection to database
conn.connect(function(err){                                         // Connection 
    if(err) throw err.code + err.fatal;                             // Error handling, if error == err.code : String, MySQL Server Error  
                                                                    //                          == err.fatal: Boolean, error is not from a MySQL
    console.log("Conected to database ");                           // if not error show on console ("...")
});



// you can use response from HTTM method;
// app.get()        -- use to response get data from HTTP method
// app.post()       -- use to create data
// app.put()        -- use to update data
// app.delete()     -- use to delete data

// ------------------------------------------------------- Get all database by request URL ---------------------------------------------------------------// 
// URL = localhost:8080/api/reports_db/get                          
app.get('/api/reports_db/get', (req,res)=>{                                         // Define route to handler HTTPRequest GET all data (path APIs, callback function)
    let sql = "SELECT * FROM reports_db";                                           // "sql" it is variable query to get database 
    conn.query(sql, function(err, rows, fields){                                    // Query connection and callback function 
        if(err) throw err.code + err.fatal;                                         // Error handling 
        let data = JSON.stringify(rows);                                            // Parsing data JavaScript object to string
        res.send(data);                                                             // Response open rows data MySQL
        console.log("Response Success :  \n" + data);                               // Show on console "Response Success :  \n" with value of data
    });
});


// Get spesific database from request URL
// URL = localhost:8080/api/reports_db/get/(id)
app.get('/api/reports_db/get/:id', (req,res)=>{                                     // Define route to handler HTTPRequest GET spesific data (path APIs, callback function)
    let sql = "SELECT * FROM reports_db WHERE no= ?";                               // "sql" its varible query to get spesific database
    conn.query(sql, [req.params.id], (err, rows, fields)=>{                         // Query Connection and callback function
        if(err) throw err.code + err.fatal;                                         // Error handling 
        let data = JSON.stringify(rows);                                            // Parsing data Javascript object to string
        res.send(data);                                                             // response open rows data MySQL
        console.log("Response Success :  \n"+ data);                                // Show on console "Response Success :  \n" with value of data
    });
});


// ------------------------------------------------------ Post data to database use URL ------------------------------------------------------------------//
// URL = localhost:8080/api/reports_db/post
app.post('/api/reports_db/post', (req, res) => {                                    // Define route to handler HTTPRequest POST data (path APIs, callback function) 
    temperature = req.body.temperature,                                             // temperature its variable req.body.temperrature
    barrometer = req.body.barrometer                                                // barrometer its variable req.body.barrometer
    let sql = "INSERT INTO reports_db (temperature, barrometer) VALUES (?,?)";      // "sql" its varible query to create database      
    conn.query(sql, [temperature, barrometer], (err, rows, fields) => {             // Query connection 
        if(err) throw err.code + err.fatal;                                         // Error handling
          res.send(rows);                                                           // When not error send (rows)
          console.log("Success post data");                                         // Show on console "Success post data"
     });
 });


// ----------------------------------------------------- Delete data in database by URL ------------------------------------------------------------------//
// URL = localhost:8080/api/reports_db/delete/(id)
 app.delete('/api/reports_db/delete/:no', (req,res)=>{                              // Define route to handler HTTPRequest DELETE data (path APIs, callback function)
     let sql ="DELETE FROM reports_db WHERE no= ?";                                 // "sql" its varible query to delete database by id
     conn.query(sql, [req.params.no], (err, rows, fields) =>{                       // Query connection
         if(err) throw err.code + err.fatal;                                        // Error handlinng
         let data = JSON.stringify(rows);                                           // Prsing data JavaScript Object to String
         res.send(data);                                                            // Send rows of data
         console.log("Data DELETED");                                               // Show on console "Data DELETED"
     });
 });


//---------------------------------------------------------- Update data to database use URL -------------------------------------------------------------//
// URL = localhost:8080/api/reports_db/update
app.put('/api/reports_db/update', (req, res) => {                                   // Define route to handler HTTPRequest UPDATE data (path APIs, callback function)
    no = req.body.no,                                                               // no its variable req.body.no
    temperature = req.body.temperature,                                             // temperature its variable req.body.temperature
    barrometer = req.body.barrometer                                                // barrometer its variable req.body.barrometer
    let sql = "UPDATE reports_db SET temperature= ?, barrometer= ? WHERE no= ?";    // "sql" its varible query to update spesific database by id      
    conn.query(sql, [temperature, barrometer, no], (err, rows, fields) => {         // Query connection
        if(err) throw err.code + err.fatal;                                         // Error handlinng
          res.send(rows);                                                           // Send rows of data
          console.log("Success to update data to database");                        // Show on console "Success to update data to database"
     });
 });


// -------------------------------------------------------- Port listen = where program running ----------------------------------------------------------//
var port=8080;                                                                      // Declare computer port listen
app.listen(port, ()=> console.log('Server running on port '+port));                 // listen port function 


// ---- ATTENTION ???????????????????
// - Before you running this program make sure MySQL database is running and has been make a simple database
