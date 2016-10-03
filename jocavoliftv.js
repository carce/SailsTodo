function f() {
  var results = [];
  for (var i = 0; i < 3; i++) {
    let x = i;
    var func = function() {
      return x;
    };
    results.push(func);
  }
  return results;
}

console.log(f()[0]());
