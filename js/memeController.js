'use strict'

let gCtx
let gElCanvas
let gElImage

function renderMeme(meme) {
  let image = new Image()
  image.src = meme.selectedImg.url
  image.onload = () => {
    gElImage = image
    resizeCanvas(image)
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTxtLine(meme)
  }
}

function initCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
}

function renderCanvas() {
  gCtx.drawImage(gElImage, 0, 0, gElCanvas.width, gElCanvas.height)
  drawTxtLine()
}

function resizeCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gElCanvas.height = elCanvasContainer.clientHeight
  gElCanvas.width = elCanvasContainer.clientWidth
}

function drawTxtLine(meme = getMeme()) {
  meme.lines.forEach((line, idx) => {
    if (idx === 0) {
      line.pos.x = gElCanvas.width / 2
      line.pos.y = 50
    } else if (idx === 1) {
      line.pos.x = gElCanvas.width / 2
      line.pos.y = gElCanvas.height - 50
    } else {
      line.pos.x = gElCanvas.width / 2
      line.pos.y = (meme.lines[idx - 1].pos.y + meme.lines[idx - 2].pos.y) / 2
    }
    gCtx.beginPath()
    gCtx.textAlign = line.align
    gCtx.strokeStyle = line.strokeColor
    gCtx.lineJoin = 'round'
    gCtx.font = `${line.size}px ${line.fontFamily}`
    gCtx.lineWidth = 7

    gCtx.texBaseline = 'middle'
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    gCtx.fillStyle = line.fillColor
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.closePath()
  })
}

function onSetLineText(e) {
  setLineText(e.target.value)
  renderCanvas()
}

function onAddTxtLine(txt = 'your input') {
  document.getElementById('stroke').value = '#000000'
  document.getElementById('fill').value = '#ffffff'
  document.querySelector('.text-input').value = ''
  addTxtLine(txt)
  const lines = getMemeLines()
  setSelectedLineIdx(lines.length - 1)
  renderCanvas()
}

function onSetColor(prop, color) {
  setColor(prop, color)
  renderCanvas()
}

function onFontSizeChange(indicator) {
  fontSizeChange(indicator)
  renderCanvas()
}

function onSwitchLines() {
  switchLines()
  const meme = getMemeLines()
  const txt = meme[getSelectesLineIdx()].txt
  const elTxtInput = document.querySelector('.text-input')
  elTxtInput.value = txt
  elTxtInput.focus()
  renderCanvas()
}

function onSaveMeme() {
  const dataUrl = gElCanvas.toDataURL('image/png')
  saveMeme(dataUrl)
  renderMemes()
}

function onRenderMemes() {
  const elAboutContainer = document.querySelector('.about-container')
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')
  const elSavedMemesContainer = document.querySelector('.saved-memes-container')

  elGalleryContainer.style.display = 'none'
  elAboutContainer.style.display = 'none'
  elMemesContainer.style.display = 'none'
  elSavedMemesContainer.style.display = 'flex'
}

function onRenderAbout() {
  const elAboutContainer = document.querySelector('.about-container')
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')
  const elSavedMemesContainer = document.querySelector('.saved-memes-container')

  elGalleryContainer.style.display = 'none'
  elAboutContainer.style.display = 'block'
  elMemesContainer.style.display = 'none'
  elSavedMemesContainer.style.display = 'none'
}
