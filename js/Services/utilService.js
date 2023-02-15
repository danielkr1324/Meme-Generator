'use strict'

function makeId(length = 3) {
  const possible = '0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return +txt
}

function makeLorem(wordCount = 30) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function setQueryParams(newParams) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  for (var paramName in newParams) {
    const paramValue = newParams[paramName]
    params.set(paramName, paramValue)
  }

  url.search = params.toString()
  window.history.pushState({ path: url.href }, '', url.href)
}

function deleteQueryParam(key) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  params.delete(key)
  url.search = params.toString()

  window.history.pushState({ path: url.href }, '', url.href)
}

function getValFromParam(key) {
  const queryStringParams = new URLSearchParams(window.location.search)
  return queryStringParams.get(key)
}
