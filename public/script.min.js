// make elements accessable
var $postList = document.getElementById('post-list');

// define route actions
window.addEventListener('hashchange', function() {
  var hashUrl = window.location.hash;
  if (hashUrl.indexOf('#blog') > -1) loadBlogPage(hashUrl.slice(5));
  if (window.location.hash === '#about') loadAboutPage();
  // if (window.location.hash === '#computerProjects') loadComputerProjects();
  // if (window.location.hash === '#musicProjects') loadMusicProjects();
});

function loadBlogPage(num) {
  $postList.innerHTML = '';
  num = Number(num || 0);
  httpGetAsync('blogIndex/' + num, function(data) {
    var data = JSON.parse(data);
    data.forEach(function(htmlStr) {
      $postList.innerHTML += htmlStr;
    });
  });
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function loadAboutPage() {
  $postList.innerHTML = '';
  var $title = document.createElement('h1');
  $title.innerHTML = 'Hello';
  $postList.appendChild($title)
}

console.log('root script ran')
// load blog according to what page of posts
