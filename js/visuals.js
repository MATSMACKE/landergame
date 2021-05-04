function importPlayerSprites() {
  for (object in dynamicObjects) {
    for (spriteName in dynamicObjects[object].sprites) {
      var sprite = document.createElement("img");
      sprite.setAttribute("id", dynamicObjects[object].sprites[spriteName]);
      sprite.setAttribute("src", "../sprites/" + dynamicObjects[object].sprites[spriteName].url);
      document.body.append(sprite);
    }
  }
}

function importWorldSprites() {
  for (object in worldObjects) {
    var sprite = document.createElement("img");
    sprite.setAttribute("id", object);
    sprite.setAttribute("src", "../sprites/" + worldObjects[object].sprite);
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
  draw.drawImage(document.getElementById(objectName), (object.x-object.center)*2 + cameraPosition.x, gameArea.canvas.height - (object.y*2 + (object.height*2) + cameraPosition.y), object.width*2, object.height*2);
}

//Render vehicle
function drawDynamicObject(object, objectName) {
  x = object.x + cameraPosition.x;
  y = object.y + cameraPosition.y;
  degrees = object.angle;
  sprite = document.getElementById(object.sprites[object.currentSprite]);
  width = object.width/object.sprites[object.currentSprite].decvehicle.width;
  height = object.height/object.sprites[object.currentSprite].decvehicle.height;

  if (object.hasParent == true) {
    x += dynamicObjects[object.connectionPoint[1]].attachNodes[object.connectionPoint[2]].x;
    y += dynamicObjects[object.connectionPoint[1]].attachNodes[object.connectionPoint[2]].y;
  }

  draw.save();

  draw.beginPath();

  draw.translate((width / 2) + x, (height / 2) + y);

  // rotate the path
  draw.rotate(degrees * Math.PI / 180);

  draw.drawImage(sprite, 0, 0, width*2, height*2);

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
    x : dynamicObjects[activeObject].x*2 + (gameArea.canvas.width/2),
    y : dynamicObjects[activeObject].y*2 + (gameArea.canvas.height/4)
  };
  return position
}

var cameraPosition;