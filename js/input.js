"use strict";

//Define input letiables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;

//Listen for KeyDown
document.addEventListener('keydown', function(event) {
  if (event.key == "ArrowLeft") {
    inputs.leftPressed = true;
  }

  if (event.key == "ArrowRight") {
    inputs.rightPressed = true;
  }

  if (event.key == "ArrowUp") {
    if (!gameState.flying) {
      gameState.flying = true;
    }
    inputs.upPressed = true;
  }

  if (event.key == 'r' || event.code == "Enter") {
    location.reload();
  }

  if (event.key == 'b') {
    history.back();
  }

  if (event.key == 'p' || event.code == "ShiftRight") {
    if (gameState.paused == true) {
      gameArea.interval = setInterval(update, 20);
      gameState.paused = false;
    }
    else {
      clearInterval(gameArea.interval);
      gameState.paused = true;
    }
  }

  if (event.code == "Space") {
    stage();
  }
}, true);

document.addEventListener('keyup', function(event) {
  if (event.key == "ArrowLeft") {
    inputs.leftPressed = false;
  }
  if (event.key == "ArrowRight") {
    inputs.rightPressed = false;
  }
  if (event.key == "ArrowUp") {
    inputs.upPressed = false;
  }
}, true);

function getInputs() {
  if (inputs.upPressed) {
    inputs.throttle = 1;
  }
  else {
    inputs.throttle = 0;
  }

  if (inputs.rightPressed && inputs.leftPressed) {
    inputs.rollThrottle = 0;
  }
  else if (inputs.rightPressed) {
    inputs.rollThrottle = 1;
  }
  else if (inputs.leftPressed) {
    inputs.rollThrottle = -1;
  }
  else {
    inputs.rollThrottle = 0;
  }
}