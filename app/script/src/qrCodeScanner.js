const myqrcode = window.qrcode

const video = document.createElement('video')
const canvasElement = document.getElementById('qr-canvas')
const canvas = canvasElement.getContext('2d')

const qrResult = document.getElementById('qr-result')
const btnScanQR = document.getElementById('btn-scan-qr')

const outputName = document.getElementById('name')
const outputPrice = document.getElementById('price')
const mainDiv = document.getElementById('main')
const btnGroup = document.getElementById('buying-btn-group')
var sumPrice = document.getElementById('sum-price')

let scanning = false

myqrcode.callback = res => {
  if (res) {
    var output = res.split('/')
    outputName.innerText = output[0]
    outputPrice.innerText = output[1]
    var s = parseInt(sumPrice.innerText)
    s += parseInt(output[1])
    sumPrice.innerText = s

    scanning = false

    video.srcObject.getTracks().forEach(track => {
      track.stop()
    })

    qrResult.hidden = false
    canvasElement.hidden = true
    btnScanQR.hidden = false
    mainDiv.style.display = ''
  }
}

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
      scanning = true
      qrResult.hidden = true
      btnScanQR.hidden = true
      canvasElement.hidden = false
      mainDiv.style.display = 'none'
      btnGroup.style.display = 'none'
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream
      video.play()
      tick()
      scan()
    })
}

function tick() {
  canvasElement.height = video.videoHeight
  canvasElement.width = video.videoWidth
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)

  scanning && requestAnimationFrame(tick)
}

function scan() {
  try {
    myqrcode.decode()
  } catch (e) {
    setTimeout(scan, 300)
  }
}
