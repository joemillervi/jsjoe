var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 3000;

// listen for static file requests
app.use('/assets', express.static(__dirname + '/public'))

// listen for specific blog pages..
app.use('/', function(req, res, next) {
  console.log('request url', req.url)
  next();
})

// load index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/api', function(req, res) {
  res.json({ firstname: 'john'})
})

app.listen(port, '0.0.0.0');