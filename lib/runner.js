var chai = require('chai'),
  webdriverio = require('webdriverio');
  //structure = require('./lib/structure');

global.assert = chai.assert;

var addCommands = require('./commands');

global.wdio = {
  createClient: function(cb) {
    var client = webdriverio.remote({
      desiredCapabilities: {
        browserName: 'chrome'
      }
    });

    addCommands(client);

    client.addCommand('do', function(command, cb) {

    });

    return client.init(cb || function() {});
  }
};

var tempIt = it;
it = function(text, func) {
  tempIt(text, function(done) {
    var ret = func();
    if (ret && typeof(ret.call) === 'function') {
      ret.call(done);
    } else {
      done();
    }
  });
};

var tempDescribe = describe;
describe = function(text, func) {
  tempDescribe(text, function() {
    this.timeout(999999);
    func();
  });
};

require('../tests/signIn');