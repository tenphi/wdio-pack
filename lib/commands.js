module.exports = function(client) {

  client.addCommand('do', function() {
    var args, func, cb;
    args = [].slice.call(arguments, 1, arguments.length - 1);
    func = [].slice.call(arguments, 0, 1);
    cb = [].slice.call(arguments, arguments.lenght - 1, 1);
    func.apply(undefined, [this].concat(args));
    cb();
  });

  client.addCommand('goUrl', function(url, check, cb) {
    this.url(url).url(function(err, res) {
      assert(!err);
      if (check === true) {
        assert.equal(res.value, url, "Wrong destination url");
      } else if (check) {
        assert.equal(res.value, check, "Wrong destination url");
      }
      cb();
    });
  });

  client.addCommand('checkTitle', function(title, cb) {
    this.getTitle(function(err, res) {
      assert(!err);
      assert.equal(res, title, 'Window title should be as defined');
      cb();
    });
  });

};