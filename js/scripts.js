

$(document).ready(function() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  oscillator = null;

  $("#onOff").click(function() {
    var context = new AudioContext();
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.start(context.currentTime);
  });


});
