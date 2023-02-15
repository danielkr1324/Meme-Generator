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
  const image = getImg(id)
  setImg(image)
  renderMeme(getMeme())
}
