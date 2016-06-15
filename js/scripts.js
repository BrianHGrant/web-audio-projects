function loadHalloweenSound() {
  var request = new XMLHttpRequest();
  request.open('GET', 'sounds/Halloween.mp3', true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      HalloweenBuffer = buffer;
      playSound();
    });
  };
  request.send();
}

function playSound(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

$(document).ready(function() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  // oscillator = null;

  $("#onOff").click(function() {
    var context = new AudioContext();
    // oscillator = context.createOscillator();
    // oscillator.connect(context.destination);
    // oscillator.start(context.currentTime);
    loadHalloweenSound();
  });


});
//   var HalloweenBuffer = null;
//
// function loadHalloweenSound(url) {
//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';
//
//   // Decode asynchronously
//   request.onload = function() {
//     context.decodeAudioData(request.response, function(buffer) {
//       HalloweenBuffer = buffer;
//     }, onError);
//   }
//   request.send();
// }
//
