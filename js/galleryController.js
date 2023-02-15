'use strict'

function onInit() {
  renderImgsGallery()
}

function renderImgsGallery() {
  let imgsGallery = getImgsGallery()
  let strHTMLs = imgsGallery.map(
    image => `<img onclick="onGetImg(${image.id})" src="${image.url}"/>`
  )

  const elGalleryContainer = document.querySelector('.gallery-container')
  elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onGetImg(id) {
  const image = getImg(id)
  setMemeImage(image)
}
