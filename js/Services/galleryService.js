'use strict'

let gImgs

let imagesKeyWords = [
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

// assign gImgs to array of meme images objects
function createImgsGallery() {
  gImgs = []
  imagesKeyWords.forEach((imageKeyWords, idx) => {
    gImgs.push(createImg(imageKeyWords, idx + 1))
  })
}

function createImg(keyWords, id) {
  return {
    id,
    url: `images/${id}.jpg`,
    keyWords: keyWords,
  }
}

function getImgsGallery() {
  return gImgs
}

function getImg(id) {
  return gImgs.find(img => img.id === id)
}

function getMeme() {
  return {
    ...gMeme,
  }
}
