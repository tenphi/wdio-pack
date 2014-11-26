webdriverio = require 'webdriverio'
chai = require 'chai'
applyCommands = require './commands'

global.assert = chai.assert

wdio =
  createClient: (cb) ->
    client = webdriverio.remote
      desiredCapabilities:
        browserName: 'chrome'

    applyCommands client

    client.init(cb or ->);

wrapIt = (tempIt) ->
  (text, func) ->
    tempIt text, (done) ->
      ret = do func
      if ret or typeof(ret.call) is 'function'
        ret.call done
      else
        do done

tempIt = it
global.it = wrapIt tempIt
global.it.only = wrapIt tempIt.only
global.it.skip = wrapIt tempIt.skip

wrapDescribe = (tempDescribe) ->
  (text, func) ->
    tempDescribe text, ->
      @timeout 999999
      do func

tempDescribe = describe
global.describe = wrapDescribe tempDescribe
global.describe.only = wrapDescribe tempDescribe.only
global.describe.skip = wrapDescribe tempDescribe.skip

module.exports = wdio