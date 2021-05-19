"use strict";

function drawUI() {
  drawXLocator();
  drawText();
  //drawFuelIndicator();
}

function drawXLocator() {
  draw.fillStyle = "black";
  draw.fillRect(10, gameArea.canvas.height - 20, gameArea.canvas.width - 20, 10);

  let ax = dynObjects[activeObject].x;
  let sx = worldObjects[startPoint].x;
  let lx = worldObjects[landingZone].x;

  calcBallisticEstimate();

  if (ax < sx) {
    drawXLocation("#656565", 1, 1);
    drawXLocation("#656565", sx - ax, lx - ax);

    drawXLocation("white", 0, 1);

    if (dynObjects[activeObject].velocity.x > 0) {
      drawXLocation("green", calcBallisticEstimate() - ax, lx - ax);
    }
  } else if (ax > lx) {
    drawXLocation("#656565", 0, 1);
    drawXLocation("#656565", lx - sx, ax - sx);

    drawXLocation("white", 1, 1);

    if (dynObjects[activeObject].velocity.x < 0) {
      drawXLocation("green", calcBallisticEstimate() - lx, ax - lx);
    }
  } else if (sx <= ax && ax <= lx) {
    drawXLocation("green", calcBallisticEstimate(), lx - sx);

    drawXLocation("white", ax, lx - sx);
  }
}

function calcBallisticEstimate() {
  let obj = dynObjects[activeObject];
  let timeToImpact = (Math.sqrt((2 * envStat.GRAVITY * obj.y) + (obj.velocity.y ** 2)) + obj.velocity.y)/envStat.GRAVITY;
  return (obj.velocity.x * timeToImpact) + obj.x;
}

function drawXLocation(color, value, scale) {
  draw.fillStyle = color;
  draw.fillRect(10 + (gameArea.canvas.width - 20)*value/scale, gameArea.canvas.height-30, 5, 20);
}

let textBoxes;

function initUI() {
  textBoxes = {
    alt : {
      name : "Altitude: ",
      bgRect : [0, 0, 160, "left", "top"],
      num : function() {
        return Math.round(dynObjects[activeObject].y - dynObjects[activeObject].height/2);
      },
      type : "distance"
    },
    downrange : {
      name : "Downrange: ",
      bgRect : [0, 1, 160, "left", "top"],
      num : function() {
        return Math.round(dynObjects[activeObject].x);
      },
      type : "distance"
    },
    velx : {
      name : "Horizontal Velocity: ",
      bgRect : [0, 1, 240, "left", "bottom"],
      num : function() {
        return Math.round(dynObjects[activeObject].velocity.x);
      },
      type : "velocity"
    },
    vely : {
      name : "Vertical Velocity: ",
      bgRect : [0, 0, 240, "left", "bottom"],
      num : function() {
        return Math.round(dynObjects[activeObject].velocity.y);
      },
      type : "velocity"
    },
    apo : {
      name : "Apoapsis: ",
      bgRect : [0, 0, 160, "right", "top"],
      num : function() {
        let obj = dynObjects[activeObject];
        return Math.round(obj.y + ((obj.velocity.y ** 2)/(2 * envStat.GRAVITY)) - (obj.height/2));
      },
      type : "distance"
    },
    impact : {
      name : "Impact: ",
      bgRect : [0, 1, 160, "right", "top"],
      num : function() {
        let obj = dynObjects[activeObject];
        let timeToImpact = (Math.sqrt((2 * envStat.GRAVITY * obj.y) + (obj.velocity.y ** 2)) + obj.velocity.y)/envStat.GRAVITY;
        return Math.round((obj.velocity.x * timeToImpact) + obj.x);
      },
      type : "distance"
    }
  }
}

let textParams = {
  rectHeight : 40,
  textX : 10,
  textY : 27,
  topOffset : 0,
  bottomOffset : 30,
  font : "16px Custom",
  textColor : "white"
}

function drawText() {
  for (let textBox in textBoxes) {
    let box = textBoxes[textBox];

    let bgRect = box.bgRect;

    let num = box.num();

    draw.fillStyle = "black";
    draw.globalAlpha = 0.3;

    let rectParams = {
      height : textParams.rectHeight,
      width : bgRect[2],
      x : (bgRect[3] == "left") ? 0 : (gameArea.canvas.width-bgRect[2]),
      y : (bgRect[4] == "top")  ? textParams.topOffset + bgRect[1]*textParams.rectHeight : 
          gameArea.canvas.height - (1 + bgRect[1])*textParams.rectHeight - textParams.bottomOffset
    }

    draw.fillRect(rectParams.x, rectParams.y, rectParams.width, rectParams.height);
    draw.fillStyle = textParams.textColor;
    draw.globalAlpha = 1;
    draw.font = textParams.font;

    let unit;

    let textDims = {
      x : (bgRect[3] == "left") ? textParams.textX : textParams.textX+(gameArea.canvas.width-bgRect[2]),
      y : (bgRect[4] == "top")  ? textParams.textY + (bgRect[1] * textParams.rectHeight) : 
                                  textParams.textY + gameArea.canvas.height - (((bgRect[1] + 1) * textParams.rectHeight) + textParams.bottomOffset)
    }

    if (box.type == "distance") {
      if (Math.abs(num) < 1000) {
        unit = "m";
      } else if (Math.abs(num) < 10000) {
        num = (num*0.001).toFixed(1);
        unit = "km";
      } else {
        num = Math.round(num*0.001)
        unit = "km";
      }
    } else if (box.type == "velocity") {
      if (Math.abs(num) < 1000) {
        unit = "m/s";
      } else if (Math.abs(num) < 10000) {
        num = (num*0.001).toFixed(1);
        unit = "km/s";
      } else {
        num = Math.round(num*0.001)
        unit = "km/s";
      }
     } else if (box.type == "acceleration") {
      if (Math.abs(num) < 1000) {
        unit = "m/s\xB2";
      } else if (Math.abs(num) < 10000) {
        num = (num*0.001).toFixed(1);
        unit = "km/s\xB2";
      } else {
        num = Math.round(num*0.001)
        unit = "km/s\xB2";
      }
    }
    draw.fillText(box.name + num + unit, textDims.x, textDims.y);
  }
}