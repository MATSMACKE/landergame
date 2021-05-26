"use strict";

let locations = {
  lc39a : [0, 0],
  lc36 : [7000, 0],
  bcsa : [-1836974, 7],
  bcsb : [-1836998, 7],
  bcols: [-1836472, 30]
}

let worldObjects = {
  lc39a : {
    sprite : "lc39a.png",
    x : 0,
    y : -18,
    width: 63,
    height: 146.5,
    center: 41.5,
    angle: 0
  },
  lc36 : {
    sprite : "lc36.png",
    x : 7000,
    y : 0,
    width : 480,
    height: 150,
    center : 235,
    angle: 0
  },
  boca : {
    sprite : "boca.png",
    x : -1837000,
    y : 0,
    width : 600,
    height : 200,
    center : 10,
    angle: 0
  }/*,
  ocisly : {
    sprite : "ocisly.png",
    x : 600000,
    y : 0,
    width : 0,
    angle: 0
  }*/
};

let worldTerrain = {
  ocean : [
    [-10000000, -4272000],
    [-1836000, -210000],
    [8000, 10000000]
  ],
  land : [
    [-4272000, -1836000],
    [-210000, 8000]
  ]
}