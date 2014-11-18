module.exports = (client) ->

  client.addCommand 'goUrl', (url, force, cb) ->
    client
      .url url
      .url (err, res) ->
        console.log(res.value, url);
        assert.isNull err
        if force
          assert.equal res.value, url,
            "Wrong destination url"
        do cb

