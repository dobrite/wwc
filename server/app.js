/* jslint node: true */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');

var io = require('socket.io');

var bone = require('bone.io');

bone.set('io.options', {
    server: io
});

// init
var app = express();
var server = http.createServer(app);

// attach websocket server to app server
io = io.listen(server);

app.configure(function(){
    console.log('port %s', process.env.PORT);
    app.set('port', process.env.PORT || 3000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
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

//socket io handlers
io.sockets.on('connection', function (socket) {
    socket.broadcast.emit('join', {msg: 'someone has joined.'});

    socket.on('chatMessage', function (data) {
        console.log(data);
        io.sockets.emit('chatMessage', data);
    });
});
