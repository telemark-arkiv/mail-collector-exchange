'use strict'

var envs = process.env
var pkg = require('../package.json')
var getMail = require('./getMailExchange')

module.exports = function (options) {
  var seneca = this

  seneca.add('cmd:collect-mail, type:user', getMailFromExchange)

  return {
    name: envs.MAIL_COLLECTOR_EXCHANGE_TAG || 'mail-collector-exchange'
  }
}

function getMailFromExchange (args, callback) {
  var seneca = this
  var user = args.user
  var result = ''
  getMail(user, function (err, data) {
    if (err) {
      callback(err)
    } else {
      result = {
        system: pkg.name,
        user: user,
        data: data
      }
      seneca.act({info: 'tasks', type: 'user', data: result})
      callback(null, {ok: true})
    }
  })
}
