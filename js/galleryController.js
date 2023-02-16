'use strict'

function onInit() {
  renderImgsGallery()
  initCanvas()
}

function renderImgsGallery() {
  let imgsGallery = getImgsGallery()
  let strHTMLs = imgsGallery.map(
    image => `<img onclick="onImgSelect(${image.id})" src="${image.url}"/>`
  )

  const elGalleryContainer = document.querySelector('.gallery-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')

  const image = getImg(id)
  setImg(image)
  renderMeme(getMeme())

  elGalleryContainer.style.display = 'none'
  elMemesContainer.style.display = 'flex'
}

function renderMemes() {
  const memes = gSavedMemes
  if (!memes.length) return

  const strHTMLs = memes.map((meme, idx) => {
    return `<img src="${meme.imageDataURL}" onclick="onSavedMemeClick(${idx})" `
  })
  const elMemesContainer = document.querySelector('.saved-memes-container')
  elMemesContainer.innerHTML = strHTMLs.join('')
  console.log(memes)
  console.log(strHTMLs)
}

function onRenderGallery() {
  const elAboutContainer = document.querySelector('.about-container')
  const elGalleryContainer = document.querySelector('.gallery-container')
  const elMemesContainer = document.querySelector('.meme-container')

  elGalleryContainer.style.display = 'flex'
  elAboutContainer.style.display = 'none'
  elMemesContainer.style.display = 'none'
}
