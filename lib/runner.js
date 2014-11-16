//var selenium = require('selenium-standalone');
//var spawnOptions = { stdio: 'inherit' };
//var seleniumArgs = ['-debug'];
//
//var server = selenium(spawnOptions, seleniumArgs);
//
//server.stdout.on('data', function(output) {
//  console.log(output);
//});
var chai = require('chai'),
  webdriverio = require('webdriverio'),
  structure = require('./lib/structure');

global.assert = chai.assert;

global.client = webdriverio.remote({
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
});

require('./commands')(client);

client.init(function() {

});

