module.exports = (client) ->

  client.addCommand 'do', ->
    args = [].slice.call arguments, 0, -1
    cb = [].splice.call arguments, arguments.length - 1, 1


  client.addCommand 'goUrl', (url, force, cb) ->
    client
      .url url
      .url (err, res) ->
        assert.isNull err
        if force
          assert.equal res.value, url,
            "Wrong destination url"
        do cb

