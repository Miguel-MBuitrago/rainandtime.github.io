var c,ctx,rainDrops;

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
    ctx.beginPath();
    ctx.strokeStyle = '#7bb8d3';
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.l);
    ctx.stroke();
  }

  fall(){
    this.y += this.vy;

    if(this.y > c.height){
      this.x = Math.floor(Math.random()*c.width) + 5;
      this.y = Math.floor(Math.random()*100) - 200; // 0-99
      this.l = Math.floor(Math.random()*30) + 1; // 1-30
      this.vy = Math.floor(Math.random()*12) + 4; // 4 - 12
    }
  }
}

// Loop
function loop(){
  c.width=document.body.clientWidth;
  c.height=document.body.clientHeight;
  ctx.clearRect(0,0,c.width,c.height);

  for(var n=0;n<rainDrops.length;n++ ){
    rainDrops[n].show();
    rainDrops[n].fall();
  }
}

function setup(){

  c = document.createElement("canvas");

  document.body.insertBefore(c,document.getElementsByClassName('content')[0]);
  //set the canvas width and height
  c.width=document.body.clientWidth;
  c.height=document.body.clientHeight;

  c.id = 'rain';
  ctx = c.getContext('2d');

  // rain = new Rain(20,20,20,16);
  rainDrops = [];

  for(var i=0;i<500;i++){
    rainDrops[i] = new RainDrop(
      Math.floor(Math.random()*c.width) + 5,
      Math.floor(Math.random()*100) - 200,
      Math.floor(Math.random()*30) + 1,
      Math.floor(Math.random()*12) + 4
    );
  }

  setInterval(loop,10);
}
