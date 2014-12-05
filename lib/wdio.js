var applyCommands, chai, tempDescribe, tempIt, wdio, webdriverio, wrapDescribe, wrapIt;

webdriverio = require('webdriverio');
chai = require('chai');
applyCommands = require('./commands');
global.assert = chai.assert;

wdio = {
  createClient: function(cb) {
    var client;
    client = webdriverio.remote({
      desiredCapabilities: {
        browserName: 'chrome'
      }
    });
    applyCommands(client);
    return client.init(cb || function() {});
  }
};

wrapIt = function(tempIt) {
  return function(text, func) {
    return tempIt(text, function(done) {
      var ret;
      ret = func();
      if (ret || typeof ret.call === 'function') {
        return ret.call(done);
      } else {
        return done();
      }
    });
  };
};

tempIt = it;
global.it = wrapIt(tempIt);
global.it.only = wrapIt(tempIt.only);
global.it.skip = wrapIt(tempIt.skip);
wrapDescribe = function(tempDescribe) {
  return function(text, func) {
    return tempDescribe(text, function() {
      this.timeout(999999);
      return func();
    });
  };
};

tempDescribe = describe;
global.describe = wrapDescribe(tempDescribe);
global.describe.only = wrapDescribe(tempDescribe.only);
global.describe.skip = wrapDescribe(tempDescribe.skip);
module.exports = wdio;
