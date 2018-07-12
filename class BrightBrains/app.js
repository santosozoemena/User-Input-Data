// require dependancies

//importing mysql module
var mysql = require('mysql');
var express = require('express');
//import body parser which alows us to parse data from the html
var bodyparser = require('body-parser')
//import express which allows us make request to the server and make routes.
var app  = express();
app.use(bodyparser.json());
// we require the body parser module and store it to variable
var urlcodedParer = bodyparser.urlencoded({extended: false});
//set the engine view to ejs not html
app.set('view engine', 'ejs')
// app.use('/assets', express.static('stuff'))
app.use('/styles', express.static(__dirname + '/styles'));

// establishing a mysql server connection
var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  database: 'customerDB',
  password: '1111'
});

//when you run app.js you want to it render your html or ejs file
app.get('/', function(req,res){
  res.render('index')
});

//Post request include body parser to allow data tobe parse through
app.post('/submit', urlcodedParer,  function(req, res, next){
  console.log(req.body.firstname1);
  console.log(req.body.lastname1);
  console.log(req.body.phone1);
  console.log(req.body.exampleInputEmail1);

// once submit is clicked it will log the data to the terminal and
// and "Now conected BIIITCH!!" tellling you that you have connection
  connection.connect(function(err){
    if(err) throw err;
    console.log("Now conected BIIITCH!!");

    // var query1 = "DROP TABLE IF EXISTS customer"
    // connection.query(query1, function(err){
    //   if (err) throw err;
    //   console.log("Table Droped biiiitch!!");
    // })
    //
    // var query2 = "CREATE TABLE customer (first_name VARCHAR(255), last_name VARCHAR(255), phone_number VARCHAR(200), email VARCHAR(100))"
    // connection.query(query2, function(err, results){
    //   if (err) throw err;
    //   console.log("Table Created BIIITCH!!");
    // });
    // query3 = "INSERT INTO customer (first_name, last_name, phone_number, email) VALUE('santos', 'ozoemena', '4242981830', 'santosozoemena@gmail.com')"
    query3 = "INSERT INTO customer (first_name, last_name, phone_number, email) VALUE('"+req.body.firstname1+"', '"+req.body.lastname1+"', '"+req.body.phone1+"', '"+req.body.exampleInputEmail1+"')"

    connection.query(query3, function(err){
      if (err) throw err
      console.log("Its Lit Biiitch !!!");
    })


  });
  // once data is past through and where done
  //render a confirmation page.
  res.render('contact-success', { title: 'Express' });


});

app.listen(3000,function(){
    console.log("Sever listening on port 3000");
});
