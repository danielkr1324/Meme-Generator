'use strict'

let gCtx
let gElCanvas
let isDrag = false

let gElImage

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function renderMeme(meme) {
  let image = new Image()
  image.src = meme.selectedImg.url
  image.onload = () => {
    gElImage = image
    resizeCanvas(image)
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    drawLine(meme)
  }
}

function initCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
}

function renderCanvas() {
  gCtx.drawImage(gElImage, 0, 0, gElCanvas.width, gElCanvas.height)
  drawLine()
}

function resizeCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gElCanvas.height = elCanvasContainer.clientHeight
  gElCanvas.width = elCanvasContainer.clientWidth
}

function drawLine(meme = getMeme()) {
  let { lines } = meme
  console.log(lines[0].txt)

  let pos = {
    x: gElCanvas.width / 2,
    y: 70,
  }

  gCtx.beginPath()
  gCtx.textAlign = lines[0].align
  gCtx.strokeStyle = lines[0].color
  gCtx.lineJoin = 'round'
  gCtx.font = `${lines[0].size}px sans-serif`
  gCtx.lineWidth = 9

  gCtx.texBaseline = 'top'
  gCtx.strokeText(lines[0].txt, pos.x, pos.y)
  gCtx.fillStyle = 'white'
  gCtx.fillText(lines[0].txt, pos.x, pos.y)
  gCtx.closePath()
}

function onSetLineText(e) {
  setLineText(e.target.value)
  renderCanvas()
}
