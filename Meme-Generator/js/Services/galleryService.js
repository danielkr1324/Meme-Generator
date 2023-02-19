'use strict'

let gImgs
let gFilterBy = null

let imagesKeywords = [
  ['trump', 'provocative', 'conspiracy', 'scheme', 'controversy', 'politics'],
  ['dog', 'cute', 'friendly', 'happy'],
  ['dog', 'baby', 'friendly', 'cute', 'happy', 'innocent'],
  ['cat', 'computer', 'accident', 'work', 'oops', 'cute', 'friendly'],
  ['achivment', 'success', 'baby', 'win', ' happy'],
  ['funny', 'conspiracy', 'history', 'scheme', 'alien', 'controversy'],
  ['baby', 'surprise', 'cute'],
  ['funny'],
  ['scheme', 'funny', 'laugh', 'oops', 'baby', 'naughty'],
  ['obama', 'laugh', 'politics'],
  ['fight', 'close', 'oops', 'kiss'],
  ['funny', 'hecht', 'scheme'],
  ['leonardo', 'toast', 'celebrate', 'happy'],
  ['matrix', 'conspiracy', 'action', 'dark'],
  ['boromir', 'funny', 'lotr'],
  ['star trek', 'funny', 'oops', 'laugh', 'accident'],
  ['putin', 'conspiracy', 'politics', 'scheme'],
  ['oops', 'toy story', 'funny'],
]
createImgsGallery()
let keywords = getKeywords()

function createImgsGallery() {
  gImgs = []
  imagesKeywords.forEach((imageKeyWords, idx) => {
    gImgs.push(createImg(imageKeyWords, idx + 1))
  })
}

function createImg(keyWords, id) {
  return {
    id,
    url: `images/${id}.jpg`,
    keywords: keyWords,
  }
}

function getImgsGallery() {
  if (!gFilterBy) return gImgs
  return gImgs.filter(img =>
    img.keywords.find(keyword => keyword.includes(gFilterBy.toLowerCase()))
  )
}

function getImg(id) {
  return gImgs.find(img => img.id === id)
}

function getKeywords() {
  let keywords = imagesKeywords.reduce((acc, keywords) => {
    keywords.forEach(keyword => {
      if (!acc.includes(keyword)) acc.push(keyword)
    })
    return acc
  }, [])
  return keywords
}

function setFilterBy(keyword) {
  gFilterBy = keyword
}
