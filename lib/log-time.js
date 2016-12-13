'use strict'

module.exports = () => {
  const now = new Date()

  return now.toUTCString()
}
