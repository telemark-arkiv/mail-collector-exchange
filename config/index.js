'use strict'

var envs = process.env

var config = {
  url: envs.EWS_MAIL_URL || 'https://epost.vfk.no/ews/Exchange.asmx',
  username: envs.EWS_MAIL_USERNAME || 'domain\\username', // Must have double slash between domain and user
  password: envs.EWS_MAIL_PASSWORD || 'password',
  domain: envs.EWS_MAIL_DOMAIN || 'skole.t-fk.no',
  mailUrl: envs.EWS_MAIL_OWA_URL || 'https://epost.vfk.no/owa/#path=/inbox',
  mailLimit: envs.EWS_MAIL_LIMIT || 20 // number of unread mails to get
}

module.exports = config
