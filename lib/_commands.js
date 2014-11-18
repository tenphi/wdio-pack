var assert = require('chai').assert;

module.exports = function(client) {

  //client.addCommand("assertText", function(selector, text, message, cb) {
  //  this.getText(selector, function (err, res) {
  //    assert.isNotNull(err);
  //    assert.strictEqual(res, text, message);
  //    cb();
  //  })
  //});

  client.addCommand('goUrl', function(url, force, cb) {
    this
      .url(url)
      .url(function(err, res) {
        assert.isNull(err);
        if (force) {
          assert.equal(res.value, url, 'Wrong destination url');
        }
        cb();
      });
  });

  client.addCommand("assertTitle", function(text, message, cb) {
    this.getTitle(selector, function (err, res) {
      assert.isNotNull(err);
      assert.strictEqual(res.value, text, message);
      cb();
    })
  });

};