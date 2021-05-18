"use strict";

function importSprites(object, type, objectName) {
  if (type == "dynamic") {
    for (let spriteName in object.sprites) {
      let sprite = document.createElement("img");
      sprite.setAttribute("id", object.sprites[spriteName].url);
      sprite.setAttribute("src", "../sprites/" + object.sprites[spriteName].url);
      document.body.append(sprite);
    }
  }
  if (type == "world") {
    let sprite = document.createElement("img");
    sprite.setAttribute("id", objectName);
    sprite.setAttribute("src", "../sprites/" + object.sprite);
    document.body.append(sprite);
  }
}

function importDynamicSprites() {
  for (let object in dynObjects) {
    let currentObject = dynObjects[object];
    importSprites(currentObject, "dynamic", object);
  }
}

function importWorldSprites() {
  for (let object in worldObjects) {
    importSprites(worldObjects[object], "world", object);
  }
}

function drawScene() {
  cameraPosition = getCameraPosition();
  drawGround();
  for (let objectID in worldObjects) {
    drawWorldObject(worldObjects[objectID], objectID);
  }
  for (let layer in visualLayers) {
    for (let objectID in visualLayers[layer]) {
      dynObjects[visualLayers[layer][objectID]].draw();
    }
  }
}

//Render a worldObject
function drawWorldObject(object, objectName) {
  draw.drawImage(document.getElementById(objectName), (object.x-object.center)*2 + cameraPosition.x, gameArea.canvas.height - (object.y*2 + (object.height*2) + cameraPosition.y), object.width*2, object.height*2);
}

//Render a vehicle
Vehicle.prototype.draw = function() {
  let x = this.x*2 + cameraPosition.x;
  let y = gameArea.canvas.height - (this.y*2 + cameraPosition.y);

  let angle = this.angle;

  let width  = (this.width/this.sprites[this.currentSprite].decvehicle.width)   * 2;
  let height = (this.height/this.sprites[this.currentSprite].decvehicle.height) * 2;

  let sprite = document.getElementById(this.sprites[this.currentSprite].url);

  draw.save();
  draw.translate(x, y);
  draw.rotate(radian(angle));
  draw.translate((width/-2), (height/-2));
  draw.drawImage(sprite, 0, 0, width, height);
  draw.restore();
}

//Draw a green rectangle as the ground
function drawGround(){
  draw.beginPath();
  draw.rect(0, gameArea.canvas.height - cameraPosition.y, gameArea.canvas.width, gameArea.canvas.height);

  draw.fillStyle = gameColors.ground;
  draw.fill();
}

//Calculates how all objects should be offset in order for the 
//active object to render in the center of the screen
function getCameraPosition() {
  let position = {
    x : dynObjects[activeObject].x*-2 + (gameArea.canvas.width/2),
    y : dynObjects[activeObject].y*-2 + (3.2*gameArea.canvas.height/4)
  };
  return position
}

let cameraPosition;