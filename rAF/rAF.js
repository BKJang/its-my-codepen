const targetElement = document.getElementById('targetElement');
targetElement.style.position = 'absolute';

let count = 0;
let stop = 0;
let slideRAFId = '';
let sleepRAFId = '';

window.requestAnimationFrame = (function (callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

const slide = () => {
  count += 1;

  if (parseInt(targetElement.style.left) > 360) {
    console.log('ALL STOP!');
    cancelAnimationFrame(slideRAFId);
    cancelAnimationFrame(sleepRAFId);
    return;
  }

  if (count <= 60) {
    console.log('SLIDE!!')
    targetElement.style.left = `${(parseInt(targetElement.style.left) + 2)}px`;
    slideRAFId = window.requestAnimationFrame(slide);
    return;
  }
  console.log('Do Callback!! when 1 second');
  count = 0;
  sleepRAFId = window.requestAnimationFrame(sleep);
}

const sleep = () => {
  stop += 1;

  if (stop <= 180) {
    console.log('STOP!! during 3 seconds')
    sleepRAFId = window.requestAnimationFrame(sleep);
    return;
  }

  stop = 0;
  slideRAFId = window.requestAnimationFrame(slide);
}

slideRAFId = window.requestAnimationFrame(slide);