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

  app.get('/api/posts', function(req, res) {
    connection.query('SELECT * FROM messages;', function(err, rows) {
      checkDBerror(err, res);
      res.send(rows);
    });
  });

  app.post('/api/posts', function(req, res) {
    const title = req.body.title;
    const url = req.body.url;
    const timestamp = time();
    const score = 0;
    if(title == null || url == null) {
        res.send('Missing info. You need both title and url.');
    } else {
      connection.query(`INSERT INTO messages (title, url, timestamp, score) VALUES(?, ?, ?, ?);`, [title, url, timestamp, score], function(err, rows) {
        checkDBerror(err, res);
        connection.query(`SELECT * FROM messages WHERE title = ? AND url = ? AND timestamp = ? AND score = ?;`, [title, url, timestamp, score], function(err, rows) {
          checkDBerror(err, res);
          res.send(rows);
        });
      });
    }
  });

  app.put('/api/posts/:id/downvote', function(req, res) {
    const id = req.params.id;
    connection.query(`UPDATE messages SET score = score - 1 WHERE id = ?;`, [id], function(err, rows) {
      checkDBerror(err, res);
      connection.query(`SELECT * FROM messages WHERE id = ?;`, [id], function(err, rows) {
        checkDBerror(err, res);
        res.send(rows);
      });
    });
  });

  app.put('/api/posts/:id/upvote', function(req, res) {
    const id = req.params.id;
    connection.query(`UPDATE messages SET score = score + 1 WHERE id = ?;`, [id], function(err, rows) {
      checkDBerror(err, res);
      connection.query(`SELECT * FROM messages WHERE id = ?;`, [id], function(err, rows) {
        checkDBerror(err, res);
        res.send(rows);
      });
    });
  });

  app.delete('/api/posts/:id/delete', function(req, res) {
    const id = req.params.id;
    connection.query(`SELECT * FROM messages WHERE id = ?;`, [id], function(err, rows) {
      checkDBerror(err, res);
      deletedrows = rows;
      connection.query(`DELETE FROM messages WHERE id = ?;`, [id], function(err, rows) {
        checkDBerror(err, res);
        res.send(deletedrows);
      });
    });
  });

  app.put('/api/posts/:id/edit', function(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const url = req.body.url;
    connection.query(`UPDATE messages SET title = ?, url = ? WHERE id = ?;`, [title, url, id], function(err, rows) {
      checkDBerror(err, res);
      connection.query(`SELECT * FROM messages WHERE id = ?;`, [id], function(err, rows) {
        checkDBerror(err, res);
        res.send(rows);
      });
    });
  });

  app.get('/home', function(req, res) {
    res.render('home');
  });
  
  const checkDBerror = (err, res) => {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error');
      return;
    }
  };

};