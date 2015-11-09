var http = require("http");
var handler = require("./request-handler");
var express = require('express');
var fs = require('fs');

var port = 8080;
var ip = "127.0.0.1";

var parser = require('body-parser');

// Router
//var router = require('./routes.js');
//var msg = {username:'busybee', text:'hello roach', roomname:'happy tree'};

var app = express();
module.exports.app = app;

app.set("port", port);

app.use(parser.text());

app.use(function(req,res,next){
  console.log('Incoming ' + req.method + ' request on ' + req.url);
  next();
});

app.use(express.static(__dirname));

/*
app.get('/classes/chatterbox/', function(req, res){
  //console.log('I got a get request from ' + req.url + ' sending back + ' + msg);
  controller.messages.get(req,res);
});
*/

app.post('/*', function(req, res){
  console.dir(req.body);

  fs.writeFile('savedImage.txt', req.body, function(err){
    if(err){
      console.log('Error! ', err);
    }
  });
  res.status(200).end('Got the data!');
});

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

