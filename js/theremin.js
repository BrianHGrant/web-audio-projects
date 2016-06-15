var calculateGain = function(mouseYPosition) {
  var minGain = 0;
  var maxGain = 1;

  return 1 - ((mouseYPosition/window.innerHeight) * maxGain) + minGain;
};

var calculateFrequency = function(mouseXPosition) {
  var minFrequency = 20;
  var maxFrequency = 2000;

  return ((mouseXPosition/window.innerWidth) * maxFrequency) + minFrequency;
};

// var drawTree = function(x1, y1, x2, y2, branchLength, branchAngle, depth) {
//   if(depth === 0) {
//     return;
//   }
//   else {
//     c.beginPath();
//     c.moveTo(x1, y1);
//     c.lineTo(x2, y2);
//     c.closePath();
//     c.stroke();
//
//     branchLength *= branchLengthRatio;
//
//     function branch(angle) {
//       var branchX2 = x2 + branchLength * Math.cos(angle);
//       var branchY2 = y2 + branchLength * Math.sin(angle);
//       drawTree(x2, y2, branchX2, branchY2, branchLength, angle, depth - 1);
//     }
//
//     // Right branch
//     branch(branchAngle + branchAngleDifference);
//
//     //
//   }
// }




$(document).ready(function() {
  var context = new AudioContext();
  mousedown = false;
  oscillator = null;
  var gainNode = context.createGain();
  // var canvas = document.getElementById("canvas");
  // var c = canvas.getContext("2d");

  // var centerX = canvas.wdith/2;
  // var trunkHeight = 100;
  // var branchLengthRatio= 0.75;
  // var branchAngleDifference = 0.27;
  // var branchingDepth = 10;


  $("body").mousedown(function(e) {
    mousedown = true;

    oscillator = context.createOscillator();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
  });

  $("body").mouseup(function() {
    mousedown = false;
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
  });
  $("html").mouseout(function() {
    mousedown = false;
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
  });

  $("body").mousemove(function(e) {
    if(mousedown) {
      oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
      gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
    }

  });
});
