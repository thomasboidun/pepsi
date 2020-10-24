console.log('slider.js works!');

let root = document.documentElement;
// select slider container
let slider_ctn = document.querySelector('.slider-container');
// get container width with parent node
// let slider_ctn_width = slider_ctn.parentNode.getBoundingClientRect().width * 1.5;
let slider_ctn_width = 150; // %
// set container width on css
// root.style.setProperty('--slider-container-width', `${slider_ctn_width}px`); // 150%
root.style.setProperty('--slider-container-width', `${slider_ctn_width}%`); // 120%
// get box width with child node
let slider_box_width = 33.33; // %
// set box width on css
// root.style.setProperty('--slider-box-width', `${slider_box_width}px`); // 33.33%
root.style.setProperty('--slider-box-width', `${slider_box_width}%`); // 33.33%
// select slider boxs
let slider_boxs = document.querySelectorAll('.slider-container .slider-box');
// get box height
let slider_box_height = slider_boxs[1].getBoundingClientRect().height;
// set container height on css
root.style.setProperty('--slider-container-height', `${slider_box_height}px`); // max content

let slider_animation_duration = 0.4;
root.style.setProperty('--slider-animation-duration', slider_animation_duration + 's');

function move(side1, side2) {
  slider_boxs.forEach(box => {
    if (box.classList.contains('middle')) {
      box.classList.toggle('move-middle-to-' + side1);
    }
    if (box.classList.contains(side1)) {
      box.classList.toggle('move-' + side1 + '-to-' + side2);
    }
    if (box.classList.contains(side2)) {
      box.classList.toggle('move-' + side2 + '-to-middle');
    }
  });

  setTimeout(() => {
    let i = 1;
    slider_boxs.forEach(box => {
      if (box.classList.contains('middle') && box.classList.contains('move-middle-to-' + side1)) {
        box.classList.toggle('move-middle-to-' + side1);
        box.classList.replace('middle', side1);
      }
      if (box.classList.contains(side1) && box.classList.contains('move-' + side1 + '-to-' + side2)) {
        box.classList.toggle('move-' + side1 + '-to-' + side2);
        box.classList.replace(side1, side2);
      }
      if (box.classList.contains(side2) && box.classList.contains('move-' + side2 + '-to-middle')) {
        box.classList.toggle('move-' + side2 + '-to-middle');
        box.classList.replace(side2, 'middle');
      }
      i++;
    })
    init();
  }, slider_animation_duration * 1000);
}

let left_right = function (event) {
  move('left', 'right')
}

let right_left = function (event) {
  move('right', 'left')
}

function init() {
  slider_boxs = document.querySelectorAll('.slider-container .slider-box');

  slider_boxs.forEach(box => {
    box.removeEventListener('click', left_right);
    box.removeEventListener('click', right_left);

    

    if (box.classList.contains('right')) {
      box.addEventListener('click', left_right);
    }
    if (box.classList.contains('left')) {
      box.addEventListener('click', right_left);
    }
  });
}

init();