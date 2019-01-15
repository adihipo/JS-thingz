module.exports = function(app){

  const time = require('./time')

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

  app.get('/posts', function(req, res) {
    connection.query('SELECT * FROM messages;', function(err, rows) {
      if (err) {
        console.log(err.toString());
        res.status(500).send('Database error');
        return;
      }
      res.send(rows);
    });
  });

  app.post('/posts', function(req, res) {
    const title = req.body.title;
    const url = req.body.url;
    const timestamp = time();
    const score = 0;
    if(title == null || url == null) {
        res.send('Missing info. You need both title and url.');
    } else {
      connection.query(`INSERT INTO messages (title, url, timestamp, score) VALUES(?, ?, ?, ?)`, [title, url, timestamp, score], function(err, rows) {
        if (err) {
          console.log(err.toString());
          res.status(500).send('Database error');
          return;
        }
        res.send('Message created.');
      });
    }
  });
  
};