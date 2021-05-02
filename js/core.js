var paused = false;

var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = window.innerWidth - 4;
      this.canvas.height = window.innerHeight - 6;
      this.canvas.unselectable = "on";
      this.canvas.oncontextmenu = "return false";
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      //generateCloudPositions();
      importWorldSprites();
      this.interval = setInterval(update, 20);
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function update() {
  gameArea.clear();
  getInputs();
  doPhysics();
  drawScene();
  //console.log(objects.stage1.velocity);
  drawUI();
}

var draw = gameArea.canvas.getContext("2d");