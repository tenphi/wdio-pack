module.exports = function(client) {

  client.addCommand("assertText", function(selector, text, message, cb) {
    this.getText(selector, function (err, res) {
      assert.isNotNull(err);
      assert.strictEqual(res, text, message);
      cb();
    })
  });

};