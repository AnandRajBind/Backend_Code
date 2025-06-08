// This is a simple module to be imported by app.js

const moduleFunctions = {
  greet: function() {
    return "Hello from index.js!";
  },
  calculateSum: function(a, b) {
    return a + b;
  },
  name: "Day2 Module"
};

module.exports = moduleFunctions;
