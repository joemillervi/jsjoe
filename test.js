

function reduce(arr, fn, acc) {
  if (arr.length === 0) return acc;
  console.log(acc)
  acc = fn(arr[0], acc)
  return reduce(arr.slice(1), fn, acc)
}



// use reduce to add
function add(x, y) {
  return x + y;
}

var addedUp = reduce([1,2,3], add, 0);

console.log(addedUp);
