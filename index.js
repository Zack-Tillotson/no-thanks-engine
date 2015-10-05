// Run all the tests all the time!

var lib = require('./dist/lib.js');

var Mocha = require('mocha');
var mocha = new Mocha();

var webpack = require("webpack");
var config = require('./webpack.config.js');
webpack(config).watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
  console.log("Recompiled");
  mocha.addFile('./dist/test.js');
  mocha.run();
});