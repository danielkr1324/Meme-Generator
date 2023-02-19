'use strict'

const eltoggleMenu = document.querySelector('.toggle-menu')
const elNavMenu = document.querySelector('.nav-menu')

function makeId(length = 3) {
  const possible = '0123456789abcdefghijklmnopqrstuvwxyz'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function onToggleMenu() {
  const eltoggleMenu = document.querySelector('.toggle-menu')
  const elNavMenu = document.querySelector('.nav-menu')
  eltoggleMenu.classList.toggle('active')
  elNavMenu.classList.toggle('active')
}

function doPopup(msg) {
  const elModal = document.querySelector('.modal')
  elModal.innerText = msg
  elModal.style.scale = 1
  elModal.style.display = 'flex'

  setTimeout(() => {
    elModal.style.scale = 0
  }, 2000)
}
