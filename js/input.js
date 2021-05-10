//Define input Variables
var rightPressed = false;
var leftPressed = false;
var upPressed = false;

//Listen for KeyDown
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {
    leftPressed = true;
  }
  if (event.keyCode == 39) {
    rightPressed = true;
  }
  if (event.keyCode == 38) {
    if (!flying) {
      flying = true;
    }
    upPressed = true;
  }
  if (event.keyCode == 82) {
    location.reload();
  }
  if (event.keyCode == 66) {
    history.back();
  }
  if (event.keyCode == 80) {
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