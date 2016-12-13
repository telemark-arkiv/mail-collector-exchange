'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const envs = process.env
const Exchange = require('./lib/exchange')

const options = {
  seneca: {
    log: 'silent',
    tag: envs.MAIL_COLLECTOR_EXCHANGE_TAG || 'mail-collector-exchange'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'cmd:collect-tasks, type:user', model: 'observe'}
    ]
  },
  exchange: {
    url: envs.TASKS_COLLECTOR_EXCHANGE_URL || 'http://www.exchange.no'
  },
  isolated: {
    host: envs.TASKS_COLLECTOR_EXCHANGE_HOST || 'localhost',
    port: envs.TASKS_COLLECTOR_EXCHANGE_PORT || '8000'
  }
}

const Service = Seneca(options.seneca)

if (envs.MAIL_COLLECTOR_EXCHANGE_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Exchange, options.exchange)
