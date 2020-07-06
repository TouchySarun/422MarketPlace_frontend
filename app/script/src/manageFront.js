function payment() {
  document.getElementById('main').style.display = 'none'
  document.getElementById('sum').style.display = ''
}
function backToBuy() {
  document.getElementById('main').style.display = ''
  document.getElementById('sum').style.display = 'none'
}
function addToBasket(name, pr, nu) {
  var price = parseInt(pr)
  var num = parseInt(nu)
  const basket = document.getElementById('basket')
  const sumPrice = document.getElementById('sum-price')

  var sP = parseInt(sumPrice.innerText)
  sumPrice.innerText = sP + (price * num)
  var b = basket.getElementsByClassName('basket-detail')
  var found = false

  for (var i = 0; i < b.length; i++) {
    if (b[i].getElementsByClassName('basket-detail-name')[0].innerText === name) {
      found = true
      var n = b[i].getElementsByClassName('basket-detail-num')[0]
      var nvalue = parseInt(n.innerText)
      nvalue += num
      n.innerText = nvalue.toString()

      var p = b[i].getElementsByClassName('basket-detail-price')[0]
      p.innerText = price * nvalue
      break
    }
  }
  if (!found) {
    basket.innerHTML += `
    <div class="basket-detail flex-row">
    <p class="basket-detail-name">${name}</p>
    <p class="basket-detail-num">${num}</p>
    <p class="basket-detail-price">${price}</p>
    </div>
    `
  }

  const btnGroup = document.getElementById('buying-btn-group')
  const qrResult = document.getElementById('qr-result')
  btnGroup.style.display = ''
  qrResult.hidden = true
}
function updateDB() {

}
