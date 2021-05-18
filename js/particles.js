"use strict";

let particleIndex = 0;
let particles = {};
let particleSettings = {
  density: 20,
  particleSize: 3,
  startingX: 0,
  startingY: 0,
  gravity: 0.1,
  maxLife: 10
};

function Particle() {
  // Establish starting positions and velocities
  let radians = radian(player.angle);
  if (gameState.exploding == false) {
    this.x = Math.round(((window.innerWidth)/2)-5) + (player.width/2) - engineTrigMultiplier*Math.sin(radians);
    this.y = engineTrigMultiplier*Math.cos(radians) + (player.height/2) + 30;
  }

  else {
    this.x = Math.round(((window.innerWidth)/2)-5);
    this.y = 100;
    gameState.explodingParticles ++;
  }

  if (gameState.exploding == false) {
    // Determine original X-axis speed based on setting limitation
    this.vx = -Math.cos(radians)*(randomG() * 12 - 6) - Math.sin(radians)*((Math.random()*10) + 7);
    this.vy = Math.cos(radians)*((Math.random()*10) + 7) + Math.sin(radians)*(randomG() * 12 - 6);
    this.gameState.exploding = false;
  }
  else {
    this.vx = (randomG() * 12) - 6;
    this.vy = (randomG()*12) - 7;
    this.color = colorFade(0, 255, 0);
    this.gameState.exploding = true;
  }

  // Add new particle to the index
  // Object used as it's simpler to manage that an array
  particleIndex ++;
  particles[particleIndex] = this;
  this.id = particleIndex;
  this.life = 0;
  this.maxLife = 5;
}

Particle.prototype.draw = function() {
  this.x += this.vx;
  this.y += this.vy;

  // Adjust for gravity
  this.vy += particleSettings.gravity;

  // Age the particle
  this.life++;

  // If Particle is old, remove it
  if (this.life >= particleSettings.maxLife) {
    delete particles[this.id];
  }

  // Create the shapes
  let draw = gameArea.context;
  draw.beginPath();
  if (this.gameState.exploding == true && this.gameState.exploding == true) {
    draw.fillStyle = RGBToHex(255, this.color, 0);
  }
  else {
    if (fuelType == "keralox") {
      draw.fillStyle = RGBToHex(255, colorFade(0, 255, this.life), 0);
    }
    else {
      draw.fillStyle = RGBToHex(colorFade(48, 209, this.life), colorFade(162, 240, this.life), colorFade(219, 255, this.life));
    }
  }
  draw.arc(this.x, this.y, particleSettings.particleSize, 0, Math.PI*2, true); 
  draw.closePath();
  draw.fill();
}

function drawParticles() {
  if (((inputs.upPressed == true) && player.fuel > 0 && landed != true)||(gameState.exploding == true && gameState.explodingParticles < 1000)) {
    // Introducing a random chance of creating a particle
    // corresponding to an chance of 1 per second,
    // per "density" value
    new Particle();
  }

  for (let i in particles) {
    particles[i].draw();
  }
};