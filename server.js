var http = require("http");
var express = require('express');
var fs = require('fs');

var port = 8080;
var ip = "127.0.0.1";

var parser = require('body-parser');

var app = express();
module.exports.app = app;

app.set("port", port);

app.use(parser.text());

app.use(function(req,res,next){
  console.log('Incoming ' + req.method + ' request on ' + req.url);
  next();
});

app.use(express.static(__dirname));


  app.get('/*', function(req, res){
  // var img = new Image();
  // img.src = './saved_files' + req.url + '.png';

  fs.readFile('./saved_files' + req.url + '.png', 'base64', function(err, result){
    if(err){
      console.log('Error reading file! ', err);
      res.status(404).end('Couldn\'t find that save file');
    } else {
      res.status(200).end(result);
    }
  })
});


app.post('/*', function(req, res){
  req.body = JSON.parse(req.body);
  //var img = new Image();
  //img.src = req.body.data;
  var img = req.body.data;
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');

  fs.writeFile('./saved_files' + req.url + '.png', buf, function(err){
    if(err){
      console.log('Error writing to file! ', err);
    }
  });
  res.status(200).end('Got the data!');
});

if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

