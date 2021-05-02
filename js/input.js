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
  if (upPressed == true) {
    if (objects[activeObject].fuel > 0) {
      var power = (objects[activeObject].thrust * lerp(objects[activeObject].exhaustVelocitySea, objects[activeObject].exhaustVelocityVac, calculateDensity(objects[activeObject].body, activeObject) / 1.45))/(objects[activeObject].fuel + objects[activeObject].drymass);

      objects[activeObject].velocity.y += Math.cos(objects[activeObject].angle * Math.PI / 180)*power/50;
      objects[activeObject].velocity.x += Math.sin(objects[activeObject].angle * Math.PI / 180)*power/50;

      objects[activeObject].fuel -= (objects[activeObject].thrust/lerp(objects[activeObject].exhaustVelocitySea, objects[activeObject].exhaustVelocityVac, calculateDensity(objects[activeObject].body, activeObject) / 1.45))/50;
    }
  }
  if (leftPressed == true) {
    objects[activeObject].angularVelocity -= 
    ((objects[activeObject].aeroControl*
    Math.abs(objects[activeObject].velocity.y)*
    calculateDensity(objects[activeObject].body, activeObject))/10 + 
    objects[activeObject].rcsPower)*
    (1/objects[activeObject].drymass+objects[activeObject].fuel)/50;
  }
  if (rightPressed == true) {
    objects[activeObject].angularVelocity += ((objects[activeObject].aeroControl*Math.abs(objects[activeObject].velocity.y)*calculateDensity(objects[activeObject].body, activeObject))/10 + objects[activeObject].rcsPower)*(objects[activeObject].drymass+objects[activeObject].fuel)/50;
  }
}
