module.exports = function(app){

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

  connection.query('SELECT book_name FROM book_mast;', function(err, rows) {
    if (err) {
      console.log(err.toString());
    }
    app.get('/', (req, res) => {
      res.render('index', {
        booknames : rows,
      });
    });
    
  });

  connection.end();
  
};