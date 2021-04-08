var canvas_rain,ctx_rain,rainDrops,timer_rain;

window.addEventListener('DOMContentLoaded', ()=>{
  document.getElementsByName('rain')[0].addEventListener('click',setup)
  document.getElementsByName('rain')[0].checked = false;
},false)


// rain
class RainDrop{
  // coordenates, length, speed
  constructor(x,y,l,v){
    this.x = x;
    this.y = y;
    this.l = l;
    this.vy = v;
  }

  show(){
    ctx_rain.beginPath();
    ctx_rain.strokeStyle = '#7bb8d3';
    ctx_rain.moveTo(this.x, this.y);
    ctx_rain.lineTo(this.x, this.y + this.l);
    ctx_rain.stroke();
  }

  fall(){
    this.y += this.vy;

    if(this.y > canvas_rain.height){
      this.x = Math.floor(Math.random() * (canvas_rain.width + 10) ) - 5;
      this.y = Math.floor(Math.random()* -canvas_rain.height );
      this.l = Math.floor(Math.random()* 20) + 1;
      this.vy = Math.floor(Math.random()* 10) + 4;
    }
  }
}

// Loop
function loop(){
  canvas_rain.width=document.body.clientWidth;
  canvas_rain.height=document.body.clientHeight;
  ctx_rain.clearRect(0,0,canvas_rain.width,canvas_rain.height);

  for(var n=0;n<rainDrops.length;n++ ){
    rainDrops[n].show();
    rainDrops[n].fall();
  }
}

function setup(){
  if(document.getElementsByName('rain')[0].checked){
    canvas_rain = document.createElement("canvas");

    document.body.insertBefore(canvas_rain,document.getElementsByClassName('content')[0]);
    //set the canvas width and height
    canvas_rain.width=document.body.clientWidth;
    canvas_rain.height=document.body.clientHeight;

    canvas_rain.id = 'rain';
    ctx_rain = canvas_rain.getContext('2d');

    // rain = new Rain(20,20,20,16);
    rainDrops = [];

    for(var i=0;i<500;i++){
      rainDrops[i] = new RainDrop(
        Math.floor(Math.random() * (canvas_rain.width + 10) ) - 5,
        Math.floor(Math.random()* -canvas_rain.height ),
        Math.floor(Math.random()* 20) + 1,
        Math.floor(Math.random()* 10) + 4
      );
    }

    timer_rain = setInterval(loop,10);
  }else{
    document.getElementById('rain').remove()
    clearInterval(timer_rain)
  }
}
