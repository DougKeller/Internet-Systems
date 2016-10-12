function setMousePosition(x, y) {
  var mouse = document.getElementById('mouse-chaser');
  mouse.style.left = x - mouse.clientWidth / 2 + 'px';
  mouse.style.top = y - mouse.clientHeight / 2 + 'px';
}

function chaseMouseClick(event) {
  setMousePosition(event.clientX + document.body.scrollLeft, event.clientY + document.body.scrollTop);
};


(function() {
  document.addEventListener('click', chaseMouseClick);

  var width = document.documentElement.clientWidth / 2;
  setMousePosition(width, 0);
})();