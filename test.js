
var func = function(i) {

  setTimeout(function(){
  console.log(i)
}, i * 100)
}

for (var i = 0; i < 5; i++) {
  func(i);
}
