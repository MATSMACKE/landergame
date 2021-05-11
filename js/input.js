//Define input Variables
var rightPressed = false;
var leftPressed = false;
var upPressed = false;

//Listen for KeyDown
document.addEventListener('keydown', function(event) {
  if (event.key == "ArrowLeft") {
    leftPressed = true;
  }
  if (event.key == "ArrowRight") {
    rightPressed = true;
  }
  if (event.key == "ArrowUp") {
    if (!flying) {
      flying = true;
    }
    upPressed = true;
  }
  if (event.key == 'r' || event.code == "Enter") {
    location.reload();
  }
  if (event.key == 'b') {
    history.back();
  }
  if (event.key == 'p' || event.code == "ShiftRight") {
    if (paused == true) {
      gameArea.interval = setInterval(update, 20);
      paused = false;
    }
    else {
      clearInterval(gameArea.interval);
      paused = true;
    }
  }
}, true);

document.addEventListener('keyup', function(event) {
  if (event.keyCode == 37) {
    leftPressed = false;
  }
  if (event.keyCode == 39) {
    rightPressed = false;
  }
  if (event.keyCode == 38) {
    upPressed = false;
  }
}, true);

function getInputs() {
  if (upPressed) {
    throttle = 1;
  }
  else {
    throttle = 0;
  }
  if (rightPressed && leftPressed) {
    rollThrottle = 0;
  }
  else if (rightPressed) {
    rollThrottle = 1;
  }
  else if (leftPressed) {
    rollThrottle = -1;
  }
  else {
    rollThrottle = 0;
  }
}