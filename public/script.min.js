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
  num = Number(num || 0);
  // Ajax request to server get next 4 posts starting with index num
}

function loadAboutPage() {
  $postList.innerHTML = '';
  var $title = document.createElement('h1');
  $title.innerHTML = 'Hello';
  $postList.appendChild($title)
}

console.log('root script ran')
// load blog according to what page of posts
