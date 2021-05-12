function drawUI() {
  drawXLocator();
  drawText();
  //drawFuelIndicator();
}

function drawXLocator() {
  draw.fillStyle = "black";
  draw.fillRect(10, gameArea.canvas.height - 20, gameArea.canvas.width - 20, 10);

  var ax = dynObjects[activeObject].x;
  var sx = worldObjects[startPoint].x;
  var lx = worldObjects[landingZone].x;

  calculateBallisticEstimate();

  if (ax < sx) {
    drawXLocation("#656565", 1, 1);
    drawXLocation("#656565", sx - ax, lx - ax);

    drawXLocation("white", 0, 1);

    if (dynObjects[activeObject].velocity.x > 0) {
      drawXLocation("green", calculateBallisticEstimate() - ax, lx - ax);
    }
  } else if (ax > lx) {
    drawXLocation("#656565", 0, 1);
    drawXLocation("#656565", lx - sx, ax - sx);

    drawXLocation("white", 1, 1);

    if (dynObjects[activeObject].velocity.x < 0) {
      drawXLocation("green", calculateBallisticEstimate() - lx, ax - lx);
    }
  } else if (sx <= ax && ax <= lx) {
    drawXLocation("green", calculateBallisticEstimate(), lx - sx);

    drawXLocation("white", ax, lx - sx);
  }
}

function calculateBallisticEstimate() {
  var obj = dynObjects[activeObject];
  var timeToImpact = (Math.sqrt((2 * gravity * obj.y) + (obj.velocity.y ** 2)) + obj.velocity.y)/gravity;
  return (obj.velocity.x * timeToImpact) + obj.x;
}

function drawXLocation(color, value, scale) {
  draw.fillStyle = color;
  draw.fillRect(10 + (gameArea.canvas.width - 20)*value/scale, gameArea.canvas.height-30, 5, 20);
}

var textBoxes;

function initUI() {
  textBoxes = {
    alt : {
      name : "Altitude: ",
      bgRect : [0, 0, 150, 40],
      num : function() {
        return Math.round(dynObjects[activeObject].y - dynObjects[activeObject].height/2);
      },
      type : "distance",
      x : 10,
      y : 27
    },
    downrange : {
      name : "Downrange: ",
      bgRect : [0, 40, 150, 40],
      num : function() {
        return Math.round(dynObjects[activeObject].x);
      },
      type : "distance",
      x : 10,
      y : 67
    },
    velx : {
      name : "Horizontal Velocity: ",
      bgRect : [0, gameArea.canvas.height-110, 240, 40],
      num : function() {
        return Math.round(dynObjects[activeObject].velocity.x);
      },
      type : "velocity",
      x : 10,
      y : gameArea.canvas.height - 84
    },
    vely : {
      name : "Vertical Velocity: ",
      bgRect : [0, gameArea.canvas.height-70, 240, 40],
      num : function() {
        return Math.round(dynObjects[activeObject].velocity.y);
      },
      type : "velocity",
      x : 10,
      y : gameArea.canvas.height - 44
    }
  }
}

function drawText() {
  for (textBox in textBoxes) {
    var box = textBoxes[textBox];

    var bgRect = box.bgRect;

    var num = box.num();

    draw.fillStyle = "black";
    draw.globalAlpha = 0.3;
    draw.fillRect(bgRect[0], bgRect[1], bgRect[2], bgRect[3]);
    draw.fillStyle = "white";
    draw.globalAlpha = 1;
    draw.font = "16px Custom";

    if (box.type == "distance") {
      if (Math.abs(num) < 1000) {
        var unit = "m";
      } else if (Math.abs(num) < 10000) {
        num = (num*0.001).toFixed(1);
        var unit = "km"
      } else {
        num = Math.round(num*0.001)
        var unit = "km";
      }
    } else if (box.type == "velocity") {
      if (Math.abs(num) < 1000) {
        var unit = "m/s";
      } else if (Math.abs(num) < 10000) {
        num = (num*0.001).toFixed(1);
        var unit = "km/s"
      } else {
        num = Math.round(num*0.001)
        var unit = "km/s";
      }
    }
    draw.fillText(box.name + num + unit, box.x, box.y);
  }
}