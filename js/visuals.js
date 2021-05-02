function importPlayerSprites() {
  for (playerObject in playerObjects) {
    var sprite = document.createElement("img");
    sprite.setAttribute("id", playerObjects[playerObject].sprite);
    sprite.setAttribute("src", "../sprites/" + playerObjects[playerObject].sprite);
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
  //getCameraPosition();
  drawGround();
  for (objectID in worldObjects) {
    drawWorldObject(worldObjects[objectID], objectID);
  }
}

//Render worldObjects
function drawWorldObject(object, objectName) {
  draw = gameArea.context;
  draw.drawImage(document.getElementById(objectName), object.x, gameArea.canvas.height - object.y - (object.height * 2), object.width * 2, object.height * 2);
}

//Render vehicle
function drawDynamicObject(object, objectName) {
  var draw = gameArea.context;

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
  draw = gameArea.context;

  draw.beginPath();
  draw.rect(0, gameArea.canvas.height - 100, gameArea.canvas.width, gameArea.canvas.height);

  draw.fillStyle = gameColors.ground;
  draw.fill();
}

function getCameraPosition() {
  position = {
    x : playerObjects[activeObject].x,
    y : playerObjects[activeObject].y
  };
  return position
}