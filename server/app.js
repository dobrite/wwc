/* jslint node: true */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

// init
var app = express();
var server = http.createServer(app);

app.configure(function(){
    console.log('port %s', process.env.PORT);
    app.set('port', process.env.PORT || 3000);
});

// set logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));

// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});

// start server
server.listen(app.get('port'), function () {
    console.log('Express App started!');
});

