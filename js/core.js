"use strict";

let gameState = {
  paused : false,
  flying : false,
  exploding : false
}

let inputs = {
  throttle : 0,
  rollThrottle : 0,
  upPressed : false,
  leftPressed : false,
  rightPressed : false
}

let throttle = 0;

let gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.unselectable = "on";
      this.canvas.oncontextmenu = "return false";
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      importWorldSprites();
      importDynamicSprites();
      initUI();
      this.interval = setInterval(update, 20);
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function update() {
  gameArea.clear();
  getInputs();
  if (gameState.flying == true) {
    doPhysics();
  }
  syncHierarchy();
  drawScene();
  drawUI();
}

let draw = gameArea.canvas.getContext("2d");