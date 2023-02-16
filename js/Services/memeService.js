'use strict'

const STORAGE_KEY = 'memesDB'

let gSavedMemes = loadFromStorage(STORAGE_KEY) || []
let gKeywordSearchCountMap = {}

let gMeme = {
  selectedImg: {},
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 30,
      align: 'center',
      color: 'black',
      fontFamily: 'impact',
      fillColor: 'white',
      pos: {},
    },
  ],
}

function setImg(image) {
  gMeme.selectedImg = image
}

function setLineText(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt ? txt : 'your input'
}

function addTxtLine(txt) {
  const anotherTxtLine = {
    txt,
    size: 30,
    align: 'center',
    strokeColor: 'black',
    fontFamily: 'impact',
    fillColor: 'white',
    pos: {},
  }
  gMeme.lines.push(anotherTxtLine)
  return
}

function getMemeLines() {
  return gMeme.lines
}

function getSelectesLineIdx() {
  return gMeme.selectedLineIdx
}

function setSelectedLineIdx(idx) {
  gMeme.selectedLineIdx = idx
}

function setColor(prop, color) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line[prop] = color
}

function fontSizeChange(indicator) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.size = indicator === 'increase' ? line.size + 1 : line.size - 1
  if (line.size === 5) line.size = 30
}

function switchLines() {
  if (gMeme.lines.length < 2) return
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
    gMeme.selectedLineIdx = 0
  else gMeme.selectedLineIdx += 1
}

function saveMeme(dataUrl) {
  gMeme.imageDataURL = dataUrl
  gMeme.memeId = makeId()
  gSavedMemes.push(gMeme)
  saveToStorage(STORAGE_KEY, gSavedMemes)
}
