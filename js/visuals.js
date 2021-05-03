function importPlayerSprites() {
  for (playerObject in dynamicObjects) {
    var sprite = document.createElement("img");
    sprite.setAttribute("id", dynamicObjects[playerObject].sprite);
    sprite.setAttribute("src", "../sprites/" + dynamicObjects[playerObject].sprite);
    document.body.append(sprite);
  }
}

function importWorldSprites() {
  for (worldObject in worldObjects) {
    var sprite = document.createElement("img");
    sprite.setAttribute("id", worldObject);
    sprite.setAttribute("src", "../sprites/" + worldObjects[worldObject].sprite);
    document.body.append(sprite);
  }
}

function drawScene() {
  cameraPosition = getCameraPosition();
  drawGround();
  for (objectID in worldObjects) {
    drawWorldObject(worldObjects[objectID], objectID);
  }
  for (objectID in dynamicObjects) {
    drawDynamicObject(dynamicObjects[objectID], objectID);
  }
}

//Render worldObjects
function drawWorldObject(object, objectName) {
  draw.drawImage(document.getElementById(objectName), object.x + cameraPosition.x, gameArea.canvas.height - (object.y + (object.height) + cameraPosition.y), object.width, object.height);
}

//Render vehicle
function drawDynamicObject(object, objectName) {
  x = object.x;
  y = object.y;
  width = object.width;
  height = object.height;
  degrees = object.angle;
  sprite = document.getElementById(object.sprites[object.currentSprite]);

  // first save the untranslated/unrotated context
  draw.save();

  draw.beginPath();
  // move the rotation point to the center of the rect
  draw.translate((x + width) / 2, (y + height) / 2);

  // rotate the path
  draw.rotate(degrees * Math.PI / 180);

  draw.drawImage(sprite, 0, 0, 40, 100);

  draw.restore();
}

function drawGround(){
  draw.beginPath();
  draw.rect(0, gameArea.canvas.height - cameraPosition.y, gameArea.canvas.width, gameArea.canvas.height);

  draw.fillStyle = gameColors.ground;
  draw.fill();
}

function getCameraPosition() {
  position = {
    x : dynamicObjects[activeObject].x + (gameArea.canvas.width/2),
    y : dynamicObjects[activeObject].y + (gameArea.canvas.height/4)
  };
  return position
}

var cameraPosition;