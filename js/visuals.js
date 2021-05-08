function importSprites(object, type, objectName) {
  if (type == "dynamic") {
    for (spriteName in object.sprites) {
      var sprite = document.createElement("img");
      sprite.setAttribute("id", object.sprites[spriteName].url);
      sprite.setAttribute("src", "../sprites/" + object.sprites[spriteName].url);
      document.body.append(sprite);
    }
  }
  if (type == "world") {
    var sprite = document.createElement("img");
    sprite.setAttribute("id", objectName);
    sprite.setAttribute("src", "../sprites/" + object.sprite);
    document.body.append(sprite);
  }
}

function importPlayerSprites() {
  for (object in dynObjects) {
    currentObject = dynObjects[object];
    importSprites(currentObject, "dynamic", object);
  }
}

function importWorldSprites() {
  for (object in worldObjects) {
    importSprites(worldObjects[object], "world", object);
  }
}

function drawScene() {
  cameraPosition = getCameraPosition();
  drawGround();
  for (objectID in worldObjects) {
    drawWorldObject(worldObjects[objectID], objectID);
  }
  for (layer in visualLayers) {
    for (objectID in visualLayers[layer]) {
      dynObjects[visualLayers[layer][objectID]].draw();
    }
  }
}

//Render worldObjects
function drawWorldObject(object, objectName) {
  draw.drawImage(document.getElementById(objectName), (object.x-object.center)*2 + cameraPosition.x, gameArea.canvas.height - (object.y*2 + (object.height*2) + cameraPosition.y), object.width*2, object.height*2);
}

Vehicle.prototype.draw = function() {
  x = this.x*2 + cameraPosition.x;
  y = gameArea.canvas.height - (this.y*2 + cameraPosition.y);
  degrees = this.angle;
  sprite = document.getElementById(this.sprites[this.currentSprite].url);
  width = this.width/this.sprites[this.currentSprite].decvehicle.width;
  height = this.height/this.sprites[this.currentSprite].decvehicle.height;

  draw.save();

  draw.beginPath();

  draw.translate(x - width, y - height);

  draw.rotate(degrees * Math.PI / 180);

  draw.drawImage(sprite, 0, 0, width*2, height*2);

  draw.restore();
};

function drawDynamicObject(object, objectName) {
  return;
}

function drawGround(){
  draw.beginPath();
  draw.rect(0, gameArea.canvas.height - cameraPosition.y, gameArea.canvas.width, gameArea.canvas.height);

  draw.fillStyle = gameColors.ground;
  draw.fill();
}

function getCameraPosition() {
  position = {
    x : dynObjects[activeObject].x*2 + (gameArea.canvas.width/2),
    y : dynObjects[activeObject].y*2 + (gameArea.canvas.height/4)
  };
  return position
}

var cameraPosition;