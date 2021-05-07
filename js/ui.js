function drawUI() {
  //drawTarget();
  //drawText();
  //drawFuelIndicator();
}

function drawTarget() {
  draw.fillStyle = "red";
  if (window.innerHeight < objects[activeObject]) {

    draw.fillRect(2*Math.round(((window.innerWidth)/2)-25) - objects[activeObject].position.x, window.innerHeight - 100, 100, 30);

    draw.fillRect(1200000 - objects[activeObject].position.x, window.innerHeight - 100, 100, 30);

    //ship
    draw.fillRect(2*Math.round(((window.innerWidth)/2)-25) - objects[activeObject].position.x, window.innerHeight - 100, 100, 30);

    draw.fillRect(1200000 - objects[activeObject].position.x, window.innerHeight - 100, 100, 30);
  }
}

function drawText() {
  draw.font = "30px Custom";
  if (colorFade(0, 252, urlDensity * 1.4475278*(Math.pow(0.99997854081, (objects[activeObject].position.y)))*6.9) > 180) {
    draw.fillStyle = "black";
  }
  else {
    draw.fillStyle = "white";
  }
  draw.fillText(Math.round(objects[activeObject].position.y), 10, 50);

  draw.fillText(Math.abs(Math.round(objects[activeObject].velocity.y)), window.innerWidth - 100, 50);

  draw.fillText(Math.round(objects[activeObject].velocity.x), window.innerWidth - 100, window.innerHeight - 100);

  draw.fillText(Math.round((Math.round(objects[activeObject].position.y))/2 - (15 + objects[activeObject].height/2) + 65) + Math.round((Math.pow(objects[activeObject].velocity.y, 2)/(2*bodies[objects[activeObject].body].gravity * urlGravity))/2) - (15 + objects[activeObject].height/2), window.innerWidth - 130, window.innerHeight - 70);

  draw.fillText(Math.round(((Math.sqrt(2*bodies[objects[activeObject].body].gravity * urlGravity*(objects[activeObject].position.y) + Math.pow(objects[activeObject].velocity.y, 2)) - objects[activeObject].velocity.y)/(bodies[objects[activeObject].body].gravity * urlGravity))/50), window.innerWidth - 130,window.innerHeight - 130);
}

function drawFuelIndicator() {
  draw.fillStyle = "green";
  draw.fillRect(10, Math.round((window.innerHeight / 2) - 100), 30, 200);

  draw.fillStyle = "red";
  draw.fillRect(10, Math.round((window.innerHeight / 2) - 100), 30, Math.round(200 - (objects[activeObject].fuel/objects[activeObject].fuelCapacity * 200)));

  draw.lineWidth = "3"
  draw.strokeStyle = "black";
  draw.strokeRect(10, Math.round((window.innerHeight / 2) - 100), 30, 200);
  draw.strokeRect(10, Math.round((window.innerHeight / 2) - 100), 30, Math.round(200 - (objects[activeObject].fuel/objects[activeObject].fuelCapacity * 200)));
  draw.strokeRect(10, Math.round((window.innerHeight / 2) - 100), 30, 200);

  draw.fillRect(10, window.innerHeight - 60, window.innerWidth - 20, 30);

  draw.fillStyle = "green";
  draw.fillRect(10, window.innerHeight - 60, (objects[activeObject].position.x/1200000)*(window.innerWidth - 20), 30);

  var downCoastTime = (Math.sqrt(2*(bodies[objects[activeObject].body].gravity * urlGravity)*(objects[activeObject].position.y) + Math.pow(objects[activeObject].velocity.y, 2)) - objects[activeObject].velocity.y)/(bodies[objects[activeObject].body].gravity * urlGravity);
  downCoastTime -= 128;

  var ballisticEstimate = objects[activeObject].position.x + objects[activeObject].velocity.x * downCoastTime/50;
  
  draw.fillStyle = "black";
  draw.fillRect(10 + (ballisticEstimate/1200000)*(window.innerWidth - 20), window.innerHeight - 60, 5, 30);
}
