'use strict'

function onInit() {
  renderImgsGallery()
  initCanvas()
  resizeCanvas()
  renderDataList()
}

function renderImgsGallery() {
  let imgsGallery = getImgsGallery()
  let strHTMLs = imgsGallery.map(
    image =>
      `<img class="grid-item" onclick="onImgSelect(${image.id})" src="${image.url}"/>`
  )

  const elGalleryContainer = document.querySelector('.gallery-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
  reInitMeme()
  chooseImg(id)
}

function renderDataList() {
  const keywords = getKeywords()
  let strHTMLs = keywords.map(keyword => `<option value="${keyword}"></option>`)

  const elKeywordsList = document.getElementById('keywordsList')
  elKeywordsList.innerHTML = strHTMLs.join('')
}

function renderMemes() {
  if (!gSavedMemes.length) return

  const strHTMLs = gSavedMemes.map((meme, idx) => {
    return `<img class="grid-item" src="${meme.imageDataURL}" onclick="onSavedMemeSelect(${idx})" />`
  })
  const elMemesContainer = document.querySelector('.saved-memes-container')
  elMemesContainer.innerHTML = strHTMLs.join('')
}

function onNavGalleryClick() {
  const elAboutContainer = document.querySelector('.about-container')
  const elGallery = document.querySelector('.gallery')
  const elMemesContainer = document.querySelector('.meme-container')
  const elSavedMemesContainer = document.querySelector('.saved-memes-container')

  elAboutContainer.style.display = 'none'
  elGallery.style.display = 'block'
  elMemesContainer.style.display = 'none'
  elSavedMemesContainer.style.display = 'none'
  renderImgsGallery()
  console.log('nuu')
}

function onSavedMemeSelect(idx) {
  gMeme = structuredClone(gSavedMemes[idx])
  chooseImg(gSavedMemes[idx].selectedImg.id)
}

function chooseImg(id) {
  const elMemesContainer = document.querySelector('.meme-container')
  const elGallery = document.querySelector('.gallery')
  const elSavedMemesContainer = document.querySelector('.saved-memes-container')

  const image = getImg(id)
  setImg(image)
  renderMeme(getMeme())

  elMemesContainer.style.display = 'flex'
  elGallery.style.display = 'none'
  elSavedMemesContainer.style.display = 'none'
}

function onSetFilterBy(keyword) {
  setFilterBy(keyword)
  renderImgsGallery()
}
