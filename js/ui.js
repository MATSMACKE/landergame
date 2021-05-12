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
    draw.fillStyle = "#656565";
    draw.fillRect(gameArea.canvas.width - 15, gameArea.canvas.height-30, 5, 20);
    draw.fillRect(10 + ((gameArea.canvas.width - 20)*(sx - ax)/(lx - ax)), gameArea.canvas.height-30, 5, 20);

    draw.fillStyle = "white";
    draw.fillRect(10, gameArea.canvas.height-30, 5, 20);

    if (dynObjects[activeObject].velocity.x > 0) {
      draw.fillStyle = "green";
      draw.fillRect(10 + (gameArea.canvas.width - 20)*(calculateBallisticEstimate() - ax)/(lx - ax), gameArea.canvas.height-30, 5, 20);
    }
  } else if (ax > lx) {
    draw.fillStyle = "#656565";
    draw.fillRect(10, gameArea.canvas.height-30, 5, 20);
    draw.fillRect(10 + ((gameArea.canvas.width - 20)*((ax - sx) - (ax - lx))/(ax - sx)), gameArea.canvas.height-30, 5, 20);

    draw.fillStyle = "white";
    draw.fillRect(gameArea.canvas.width - 15, gameArea.canvas.height-30, 5, 20);

    if (dynObjects[activeObject].velocity.x < 0) {
      draw.fillStyle = "green";
      draw.fillRect(10 + (gameArea.canvas.width - 20)*(calculateBallisticEstimate() - lx)/(ax - lx), gameArea.canvas.height-30, 5, 20);
    }
  } else if (sx <= ax && ax <= lx) {
    draw.fillStyle = "green";
    draw.fillRect(10 + (gameArea.canvas.width - 20)*calculateBallisticEstimate()/(lx - sx), gameArea.canvas.height-30, 5, 20);
    
    draw.fillStyle = "white";
    draw.fillRect(10 + ((gameArea.canvas.width - 20)*ax/(lx - sx)), gameArea.canvas.height-30, 5, 20);
  }
}

function calculateBallisticEstimate() {
  var obj = dynObjects[activeObject];
  var timeToImpact = (Math.sqrt((2 * gravity * obj.y) + (obj.velocity.y ** 2)) + obj.velocity.y)/gravity;
  return (obj.velocity.x * timeToImpact) + obj.x;
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