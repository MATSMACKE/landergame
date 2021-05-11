function calculateEnginePosition() {

}

function calculateContactPoint() {

}

var explosion;

var startPoint;
var landingZone;

var url = new URL(window.location);

startPoint = url.searchParams.get("start");
landingZone = url.searchParams.get("land");

function centerPositionX(objectWidth) {
  return Math.round(((window.innerWidth)/2)-(objectWidth/2));
}

function colorFade(c1, c2, value){
  if (explosion == true) {
    return Math.round(Math.random()*255);
  }
  else {
    return Math.round(((c1*(10-value))+(c2*value))/10)
  }
}

function bellCurveRandom(){
    var r = 0;
    for(var i = 3; i > 0; i --){
        r += Math.random();
    }
    return r / 3;
}

function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1){
    r = "0" + r;}
  if (g.length == 1){
    g = "0" + g;}
  if (b.length == 1){
    b = "0" + b;}

  return "#" + r + g + b;
}

function lerp(value1, value2, factor) {
  if (factor < 1) {
    return value1*(1-factor)+value2*factor;
  }
  else {
    return value2;
  }
}

function radian(degrees) {
  return degrees * Math.PI/180;
}

function sin(angle) {
  return Math.sin(radian(angle));
}

function cos(angle) {
  return Math.cos(radian(angle));
}

function p(value) {
  console.log(value);
}