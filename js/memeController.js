'use strict'

let gCtx
let gElCanvas
let gElImage

function renderMeme(meme) {
  let image = new Image()
  image.src = meme.selectedImg.url
  image.onload = () => {
    gElImage = image
    resizeCanvas()
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

    drawTxtLine(meme)
    window.addEventListener('resize', resizeCanvas)
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
  gElCanvas.height = elCanvasContainer.offsetHeight
  gElCanvas.width = elCanvasContainer.offsetWidth
  renderMeme(getMeme())
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

function onAddTxtLine(txt = 'ADD TEXT') {
  document.getElementById('stroke').value = '#000000'
  document.getElementById('fill').value = '#ffffff'
  const elTxtInput = document.querySelector('.text-input')
  elTxtInput.value = ''
  elTxtInput.focus()
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
  const dataUrl = gElCanvas.toDataURL()
  saveMeme(dataUrl)
  renderMemes()
}

function onCloseEditor() {
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')
  elGalleryContainer.style.display = 'grid'
  elMemesContainer.style.display = 'none'
}

function onNavMemesClick() {
  const elAboutContainer = document.querySelector('.about-container')
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')
  const elSavedMemesContainer = document.querySelector('.saved-memes-container')

  elGalleryContainer.style.display = 'none'
  elAboutContainer.style.display = 'none'
  elMemesContainer.style.display = 'none'
  elSavedMemesContainer.style.display = 'grid'
  renderMemes()
}

function onNavAboutClick() {
  const elAboutContainer = document.querySelector('.about-container')
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')
  const elSavedMemesContainer = document.querySelector('.saved-memes-container')

  elAboutContainer.style.display = 'block'
  elGalleryContainer.style.display = 'none'
  elMemesContainer.style.display = 'none'
  elSavedMemesContainer.style.display = 'none'
}

function onRemoveTxtLine() {
  removeTxtLine()
  renderCanvas()
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log(encodedUploadedImgUrl)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR

    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}
