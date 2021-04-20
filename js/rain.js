var rain_canvas,rain_ctx,rainDrops,rain_timer;

window.addEventListener('DOMContentLoaded', ()=>{
  $('#rain_input').on('click',setup);
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
    rain_ctx.beginPath();
    rain_ctx.strokeStyle = '#7bb8d3';
    rain_ctx.moveTo(this.x, this.y);
    rain_ctx.lineTo(this.x, this.y + this.l);
    rain_ctx.stroke();
  }

  fall(){
    this.y += this.vy;

    if(this.y > rain_canvas.height){
      this.x = Math.floor(Math.random() * (rain_canvas.width + 10) ) - 5;
      this.y = Math.floor(Math.random()* (-rain_canvas.height));
      this.l = Math.floor(Math.random()* 20) + 1;
      this.vy = Math.floor(Math.random()* 10) + 4;
    }
  }
}

// Loop
function loop(){
  rain_canvas.width= $('body').width();
  rain_canvas.height=$('body').height();
  rain_ctx.clearRect(0,0,rain_canvas.width,rain_canvas.height);

  for(var n=0;n<rainDrops.length;n++ ){
    rainDrops[n].show();
    rainDrops[n].fall();
  }
}

function setup(){
  if($('#rain_input').is(':checked')){
    rain_canvas = document.createElement("canvas");

    document.body.insertBefore(rain_canvas,document.getElementsByClassName('content')[0]);
    //set the canvas width and height
    // rain_canvas.width=document.body.clientWidth;
    // rain_canvas.height=document.body.clientHeight;
    rain_canvas.width = $('body').width();
    rain_canvas.height = $('body').height();
    rain_canvas.id = 'rain';
    rain_ctx = rain_canvas.getContext('2d');

    rainDrops = [];

    for(var i=0;i<500;i++){
      rainDrops[i] = new RainDrop(
        Math.floor(Math.random() * (rain_canvas.width + 10) ) - 5,
        Math.floor(Math.random()* - rain_canvas.height ),
        Math.floor(Math.random()* 20) + 1,
        Math.floor(Math.random()* 10) + 4
      );
    }

    rain_timer = setInterval(loop,10);
  }else{
    $('#rain').remove();
    clearInterval(rain_timer);
  }
}
