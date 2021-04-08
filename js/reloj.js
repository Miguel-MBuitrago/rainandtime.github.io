// window.addEventListener('DOMContentLoaded', setup, false)

window.addEventListener('DOMContentLoaded', ()=>{
  document.getElementsByName('clock_input')[0].addEventListener('click',init)
  document.getElementsByName('clock_input')[0].checked = false;
},false)

var canvas_clock = document.createElement('canvas')
canvas_clock.id = 'canvas_clock'
var ctx_clock = canvas_clock.getContext('2d')
var date = new Date()
var clock_timer;

function drawDate(){
  let h1 = document.createElement('h1')

  if(document.getElementById('h1_date')){
    document.getElementById('h1_date').remove()
  }

  h1.id = 'h1_date';

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  h1.innerText = day + ' / ' + month+ ' / ' + year

  let div_clock = document.getElementById('clock')

  div_clock.insertBefore(h1, div_clock.firstChild)
}

function init(){

  if (document.getElementsByName('clock_input')[0].checked) {
    canvas_clock.width = 200
    canvas_clock.height = 200

    ctx_clock.translate(100,100)
    let div_clock = document.createElement('div')
    div_clock.id = 'clock'
    div_clock.appendChild(canvas_clock)

    document.getElementsByTagName('main')[0].appendChild(div_clock)

    drawClock()
    clock_timer = setInterval(drawClock, 500)

  }else {
    document.getElementById('clock').remove()
    clearInterval(clock_timer)
  }
}

function drawClock(){
  ctx_clock.beginPath()
  ctx_clock.fillStyle = 'white'
  ctx_clock.arc(0,0,100,0,2*Math.PI)
  ctx_clock.fill()

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
  ctx_clock.beginPath()
  ctx_clock.moveTo(0,0)

  ctx_clock.lineWidth = 3
  ctx_clock.lineCap = "round";

  let deg,len
  switch (type) {
    case 'h':
        deg = (Math.PI/6 * pos)
        ctx_clock.strokeStyle = 'black'
        len = 30
      break;
    case 'm':
        deg = (Math.PI/30 * pos)
        ctx_clock.strokeStyle = 'blue'
        len = 60
      break;
    case 's':
        deg = (Math.PI/30 * pos)
        ctx_clock.strokeStyle = 'red'
        len = 90
      break;
    default:
  }

  ctx_clock.rotate(deg)
  ctx_clock.lineTo(0,-len)
  ctx_clock.stroke()
  ctx_clock.rotate(-deg)
}
