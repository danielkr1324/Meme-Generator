'use strict'

function makeId(length = 3) {
  const possible = '0123456789abcdefghijklmnopqrstuvwxyz'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
