var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 3000;

// load index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// listen for static file requests
app.use('/assets', express.static(__dirname + '/public'))

// listen for specific blog page requests and send back array of blogs as html string
app.get(/blogIndex/, function(req, res, next) {
  console.log('blogIndex:', req.url);
  res.send(returnPosts(Number(req.url.slice(11)), 4)); // SET NUMBER OF POSTS GIVEN BACK HERE
})

// listen for a request for a specific blog page
app.get(/fetchBlog/, function(req, res, next) {
  console.log('fetchBlog:', req.url);
  res.send(returnPost(Number(req.url.slice(11))))
})

// listen for about, computer and music page requests
app.get(/static/, function(req, res, next) {
  res.send(returnPublicHtmlFile(req.url.slice(8)));
})

// return an object of posts starting at a given index. length specified by count
function returnPosts(firstPostIndex, count) {
  var posts = {};
  for (var i = firstPostIndex; i < firstPostIndex + count; i++) {
    var path = __dirname + '/app/blogPosts/' + i + '.html';
    if (fileExists(path)) posts[i] = fs.readFileSync(path, 'utf8');
  }
  return JSON.stringify(posts)
}

// return string of single blog post
function returnPost(i) {
  var path = __dirname + '/app/blogPosts/' + i + '.html';
  if (fileExists(path)) return fs.readFileSync(path, 'utf8');
}

// used to return music, computer and about pages
function returnPublicHtmlFile(name) {
  console.log('return public html file requested: ', name);
  var path = __dirname + '/public/' + name + '.html';
  if (fileExists(path)) return fs.readFileSync(path, 'utf8');
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
