window.addEventListener('DOMContentLoaded', ()=>{
  $('#clock_input').on('click',clock.init);
},false)

const clock = {
  clock_interval: undefined,

  drawClock: ()=>{
    const clock_html =
      `<div id="clock">
        <h2>UTC</h2>

        <span id='n_12'>12</span>
        <span id='n_3'>3</span>
        <span id='n_6'>6</span>
        <span id='n_9'>9</span>

        <div id="seconds" class="clock-hand"></div>
        <div id="minutes" class="clock-hand"></div>
        <div id="hour" class="clock-hand"></div>
      </div>`;

    $('main').html(clock_html);
  },

  updateClock: ()=>{
    let date = new Date();
    let milliseconds = parseInt(date.getUTCMilliseconds()) / 1000;
    let seconds = parseFloat(date.getUTCSeconds() + milliseconds) / 60;
    let minutes = parseFloat( date.getUTCMinutes() + seconds) / 60;
    let hour = parseFloat(date.getUTCHours() + minutes) / 12 ;

    let milliseconds_deg = milliseconds * 360 + 90;
    let seconds_deg = seconds * 360 + 90;
    let minutes_deg = minutes * 360 + 90 ;
    let hour_deg = hour * 360 + 90;

    $('#hour').css("transform", "rotate(" + hour_deg + "deg)");
    $('#minutes').css("transform", "rotate(" + minutes_deg + "deg)");
    $('#seconds').css("transform", "rotate(" + seconds_deg + "deg)");
    $('#milliseconds').css("transform", "rotate(" + milliseconds_deg + "deg)");
  },

  deleteClock: ()=>{
    $('main').html('');
    clearInterval(clock.clock_interval);
    clock.clock_interval = undefined;
  },

  init: ()=>{
    if ($('#clock_input').is(':checked')) {
      clock.drawClock();
      clock.clock_interval = setInterval(clock.updateClock,1);
    }else{
      clock.deleteClock();
    }

  }
};
