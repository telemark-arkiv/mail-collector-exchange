var ews = require('ews-javascript-api')
var ntlmXHR = require('./ntlmXHRApi')
var config = require('../config')
var ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.username, config.password)

// create ExchangeService object
function getMail (username, callback) {
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

  var items = []
  var i = 0
  exch.FindItems(folder, sf, view)
    .then((response) => {
      items = response.Items
      var obj = []
      for (i in items) {
        var item = {
          systemid: 'exchange',
          timestamp: new Date().getTime(),
          title: items[i].Subject,
          url: config.mailUrl
        }
        obj.push(item)
      }
      return callback(null, obj)
    }, (err) => {
      return callback(err)
    }
  )
}

module.exports = getMail
