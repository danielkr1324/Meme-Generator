'use strict'

const STORAGE_KEY = 'memesDB'

let gKeywordSearchCountMap = {}

let gMeme = {
  selectedImg: {},
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'center',
      color: 'black',
    },
  ],
}

function setImg(image) {
  gMeme.selectedImg = image
}

function setLineText(txt) {
  gMeme.lines[0].txt = txt
}
