// locally store all blogs that have been loaded
var localBlogCache = {};

// make elements accessable
var $postList = document.getElementById('post-list');

// define route actions
function applyRoutes() {
  var hashUrl = window.location.hash;
  if (window.location.hash === '') loadBlogPage();
  if (hashUrl.indexOf('#blog') > -1) loadBlogPage(hashUrl.slice(5));
  if (hashUrl.indexOf('#blogPost') > -1) loadFullPost(hashUrl.slice(9));
  if (window.location.hash === '#about') loadAboutPage();
 // if (window.location.hash === '#computerProjects') loadComputerProjects();
  // if (window.location.hash === '#musicProjects') loadMusicProjects();
}

// listen for url changes
window.addEventListener('hashchange', applyRoutes);

// fetches next 4 blog posts after index specified (included), stores them locally, and prints them
function loadBlogPage(index) {
  console.log('loadBlogPage INITIATED')
  $postList.innerHTML = '';
  index = Number(index || 0);
  httpGetAsync('blogIndex/' + index, function(data) {
    var data = JSON.parse(data);
    for (i in data) {
      localBlogCache[i] = localBlogCache[i] || data[i]; // store locally if not cached
      // cut it short for preview and add the button under it to load that specific blog post fully with comments
      $postList.innerHTML += data[i].slice(0, data[i].indexOf('<CUT>')) + '</div></div>' + makeShowPostButton(i);
    }
  });
}

// if post is in cache, load using cache. Otherwise GET the post and load it
// append comment section
function loadFullPost(index) {
  console.log('loadFullPost INITIATED');
  if (index in localBlogCache) printFullPost(localBlogCache[index]);
  else {
    httpGetAsync('fetchBlog/' + index, function(data) {
      printFullPost(data);
    });
  }
  function printFullPost(data) {
    $postList.innerHTML = data;
  }
}

// helper function to make a GET request
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function makeShowPostButton(postIndex) {
  return '<div class="go-to-post"><a href="#blogPost' + postIndex + '">Continue reading..</a></div>';
}

function loadAboutPage() {
  $postList.innerHTML = '';
  var $title = document.createElement('h1');
  $title.innerHTML = 'Hello';
  $postList.appendChild($title)
}

// on initial page load, update page with requested url
applyRoutes()
