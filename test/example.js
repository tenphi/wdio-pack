var wdio = require('../lib/wdio');

describe('user', function() {
  var Auth = null,
    client = null;

  before(function(done) {
    return client = wdio.createClient(done);
  });

  it('should be authorized after he enter credentials', function() {
    return client
      .goUrl('https://cloud.mail.ru/', true)
      .checkTitle('Облако Mail.Ru');
  });

  after(function(done) {
    client.end().call(done);
  });

});

