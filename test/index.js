// Run all the tests all the time!

var Mocha = require('mocha');
var webpack = require("webpack");

var config = require('../webpack.config.js');

console.log("Compiling...");
webpack(config).run(function(err, stats) {
  console.log("Complete. Beginning tests.");

  var mocha = new Mocha({
    reporter: 'spec'
  });

  mocha.addFile('./test/deck.js');
  mocha.addFile('./test/player.js');
  mocha.addFile('./test/table.js');
  mocha.addFile('./test/engine.js');

  mocha.run();
});