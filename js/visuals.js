function importPlayerSprites() {
  for (object in dynObjects) {
    for (spriteName in dynObjects[object].sprites) {
      var sprite = document.createElement("img");
      sprite.setAttribute("id", dynObjects[object].sprites[spriteName].url);
      sprite.setAttribute("src", "../sprites/" + dynObjects[object].sprites[spriteName].url);
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
  for (objectID in dynObjects) {
    dynObjects[objectID].draw();
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

  if (this.hasOwnProperty(''))

  draw.save();

  draw.beginPath();

  draw.translate(x - width, y - height*2);

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