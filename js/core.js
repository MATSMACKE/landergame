var paused = false;

var flying = false;

var throttle = 0;
var rollThrottle = 0;

var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.unselectable = "on";
      this.canvas.oncontextmenu = "return false";
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      importWorldSprites();
      importPlayerSprites();
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
  if (flying == true) {
    doPhysics();
  }
  doHierarchySync();
  drawScene();
  drawUI();
}

var draw = gameArea.canvas.getContext("2d");