'use strict'; 

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 5000);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  // Express's global error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({"message": err.message});
  });
  
  // start listening on our port
  var server = app.listen(app.get('port'), function() {
    console.log('Express server is listening on port ' + server.address().port);
  });
  