function drawUI() {
  drawTargets();
  drawXLocator();
  //drawText();
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