module.exports = function(app){

  const mysql      = require('mysql');
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '2357',
    database : 'reddit_frontend'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

  app.get('/', function(req, res) {
    connection.query('SELECT * FROM messages;', function(err, rows) {
      if (err) {
        console.log(err.toString());
        res.status(500).send('Database error');
        return;
      }
      res.send(rows);
    });
  });
  
};