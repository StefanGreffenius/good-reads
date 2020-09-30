
var a, b, i, iterations;

Classes = {};

Classes.withThisContext = (function() {
  withThisContext.variableA = Math.sqrt(Math.pow(8, 8));

  function withThisContext() {}

  withThisContext.prototype.getVariableA = function() {
    return this.variableA;
  };

  return withThisContext;

})();

Classes.withoutThisContext = (function() {
  var variableB;

  variableB = Math.sqrt(Math.pow(8, 8));

  function withoutThisContext() {}

  withoutThisContext.prototype.getVariableB = function() {
    return variableB;
  };

  return withoutThisContext;

})();

iterations = 9999999;

console.time('Caching in a this.variable');

i = 0;

a = new Classes.withThisContext;

while (i < iterations) {
  a.getVariableA();
  i++;
}

console.timeEnd('Caching in a this.variable');

console.time('Caching in a variable');

i = 0;

b = new Classes.withoutThisContext;

while (i < iterations) {
  b.getVariableB();
  i++;
}

console.timeEnd('Caching in a variable');
