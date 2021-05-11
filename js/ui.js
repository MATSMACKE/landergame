function drawUI() {
  drawTargets();
  drawXLocator();
  drawText();
  //drawFuelIndicator();
}

function drawTargets() {
  var activeObjectObj = dynObjects[activeObject];
  draw.fillStyle = "red";
  if (-1 *cameraPosition.y > 0) {
    draw.fillRect(2*Math.round(((window.innerWidth)/2)-25) - activeObjectObj.x, window.innerHeight - 100, 100, 30);

    draw.fillRect(activeObjectObj.x, window.innerHeight - 100, 100, 30);
  }
}

function drawXLocator() {
  draw.fillStyle = "black";
  draw.fillRect(10, gameArea.canvas.height - 20, gameArea.canvas.width - 20, 10);
}

function drawText() {
  draw.fillStyle = "black";
  draw.globalAlpha = 0.3;
  draw.fillRect(0, 0, 180, 55);
  draw.fillStyle = "white";
  draw.globalAlpha = 1;
  draw.font = "24px Custom"
  var y = Math.round(dynObjects[activeObject].y - dynObjects[activeObject].height/2);
  draw.fillText("Altitude: " + y, 10, 35);
}