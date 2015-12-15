var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 3000;

// listen for static file requests
app.use('/assets', express.static(__dirname + '/public'))

// listen for specific blog page requests and send back array of blogs as html string
app.get(/blogIndex/, function(req, res, next) {
  console.log('request url:', req.url)
  res.send(returnPosts(Number(req.url.slice(11)), 2)); // SET NUMBER OF POSTS GIVEN BACK HERE
})

// load index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// return an array of posts starting at a given index. length specified by count
function returnPosts(firstPostIndex, count) {
  var posts = [];
  for (var i = firstPostIndex; i < firstPostIndex + count; i++) {
    var path = __dirname + '/app/blogPosts/' + i + '.html';
    if (fileExists(path)) posts.push(fs.readFileSync(path, 'utf8'));
  }
  console.log(posts)
  return JSON.stringify(posts)
}

// check if file exists
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }
  catch (err) {
    return false;
  }
}

// json example
app.get('/api', function(req, res) {
  res.json({ firstname: 'john'})
})

app.listen(port, '0.0.0.0');
