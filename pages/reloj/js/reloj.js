window.addEventListener('DOMContentLoaded', setup, false)

var canvas_reloj = document.createElement('canvas')
canvas_reloj.id = 'reloj'
var ctx = canvas_reloj.getContext('2d')
var date = new Date()

function drawDate(){
  let h1 = document.createElement('h1')

  if(document.getElementById('fecha')){
    document.getElementById('fecha').remove()
  }

  h1.id = 'fecha';

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  h1.innerText = day + ' / ' + month+ ' / ' + year

  let main = document.getElementsByTagName('main')[0]

  main.insertBefore(h1, main.firstChild);
}

function init(){

  canvas_reloj.width = 200
  canvas_reloj.height = 200

  ctx.translate(100,100)
  document.getElementsByTagName('main')[0].appendChild(canvas_reloj)

  setInterval(drawClock, 100)

}

function drawClock(){
  ctx.beginPath()
  ctx.fillStyle = 'white'
  ctx.arc(0,0,100,0,2*Math.PI)
  ctx.fill()

  date = new Date();
  drawDate();

  let hour = date.getHours() % 12
  let minute = date.getMinutes()
  let second = date.getSeconds()

  drawHand('s',second)
  drawHand('m',minute)
  drawHand('h',hour)
}

function drawHand(type,pos){
  ctx.beginPath()
  ctx.moveTo(0,0)

  ctx.lineWidth = 3
  ctx.lineCap = "round";

  let deg,len
  switch (type) {
    case 'h':
        deg = (Math.PI/6 * pos)
        ctx.strokeStyle = 'black'
        len = 30
      break;
    case 'm':
        deg = (Math.PI/30 * pos)
        ctx.strokeStyle = 'blue'
        len = 60
      break;
    case 's':
        deg = (Math.PI/30 * pos)
        ctx.strokeStyle = 'red'
        len = 90
      break;
    default:
  }

  ctx.rotate(deg)
  ctx.lineTo(0,-len)
  ctx.stroke()
  ctx.rotate(-deg)
}

function setup(){
    init()
}
