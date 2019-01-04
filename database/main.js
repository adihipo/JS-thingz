var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'adihipo',
  password : '2357',
  database : 'bookinfo'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM author;', function(err, rows) {
  if (err) {
    console.log(err.toString());
  }

  console.log('Data received from Db:\n');
  console.log(rows);
});

connection.end();