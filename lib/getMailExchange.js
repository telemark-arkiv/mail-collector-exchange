var ews = require('ews-javascript-api')
var ntlmXHR = require('./ntlmXHRApi')
var config = require('../config')
var ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.username, config.password)

// create ExchangeService object
module.exports = (username, callback) => {
  var upn = username + '@' + config.domain
  var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013)
  exch.XHRApi = ntlmXHRApi
  exch.Credentials = new ews.ExchangeCredentials(config.username, config.password)
  exch.ImpersonatedUserId = new ews.ImpersonatedUserId(ews.ConnectingIdType.PrincipalName, upn)
  ews.EwsLogging.DebugLogEnabled = false // turn off logging

  // set ews endpoint url to use
  exch.Url = new ews.Uri(config.url) // you can also use exch.AutodiscoverUrl

  var folder = new ews.FolderId(ews.WellKnownFolderName.Inbox)
  var sf = new ews.SearchFilter.IsNotEqualTo(ews.EmailMessageSchema.IsRead, true)
  var view = new ews.ItemView(config.mailLimit)
  exch.FindItems(folder, sf, view)
    .then((response) => {
      var countEmails = response.items.length
      console.log(`mail-collector-exchange: collected mail for ${username} found ${countEmails}`)
      if (countEmails === 0) {
        return callback(null, [])
      }
      if (response.items.length === config.mailLimit) {
        countEmails = '<' + config.mailLimit
      }
      var item = [
        {
          systemid: 'mail-exchange',
          timestamp: new Date().getTime(),
          title: 'Ulest epost (' + countEmails + ')',
          url: config.mailUrl
        }
      ]
      return callback(null, item)
    }, (err) => {
      console.log(`mail-collector-exchange: error in mail collector for ${username} - ${JSON.stringify(err)}`)
      return callback(null, [])
    }
  )
}
