"use strict";

function Vehicle(asset, parent, children, connection) {
    for (let propertyName in assets[asset]) {
        this[propertyName] = assets[asset][propertyName];
    }
    this.parent = parent;
    this.children = children;
    this.connection = connection;
    this.velocity = {
        x : 0,
        y : 0,
        angular : 0
    };
    this.x = 0;
    this.y = 0;
    this.angle = 0;
}

function dynObjectsSetup() {
    for (let objectID in dynObjects) {
        let thisObject = dynObjects[objectID];
        if (thisObject.parent != false) {
            if (dynObjects[thisObject.parent].parent == false) {
                thisObject.highestParent = dynObjects[objectID].parent;
            }
            else {
                thisObject.highestParent = dynObjects[thisObject.parent].highestParent;
            }
        }
        else {
            thisObject.highestParent = objectID;
            thisObject.y += thisObject.height/2;

            thisObject.x = worldObjects[startPoint].x;
        }
    }
}

let assets = {
    f9s1 : {
        sprites : {
            default : {
                url : "f9legsin.png",
                px : {
                    width : 90,
                    height : 297
                },
                decvehicle : {
                    width : 0.247,
                    height : 0.974
                }
            },
            s1 : {
                url : "f9legsout.png",
                px : {
                    width : 90,
                    height : 297
                },
                decvehicle : {
                    width : 0.247,
                    height : 0.974
                }
            }
        },
        mass : {
            dry : 25.6,
            fuel : 395.7
        },
        fuelConsumption : 2.443,
        thrust : {
            sealvl : 7607,
            vac : 8227,
        },
        engineNumber : 9,
        height : 47.7,
        width : 3.7,
        attachNodes : {
            top : {
                x : 0,
                y : 47
            }
        },
        parent : false,
        currentSprite : "default",
        rollFactor : 0.1
    },
    f9s2 : {
        sprites : {
            default : {
                url : "f9s2.png",
                px : {
                    width : 24,
                    height : 100
                },
                decvehicle : {
                    width : 0.93,
                    height : 1
                }
            }
        },
        mass : {
            dry : 3.9,
            fuel : 92.67
        },
        fuelConsumption : 0.233,
        thrust : {
            sealvl : 0,
            vac : 1,
        },
        engineNumber : 1,
        height : 13.8,
        width : 3.7,
        attachNodes : {
            top : {
                x : 0,
                y : 13.8
            },
            bottom : {
                x : 0,
                y : 2.3
            }
        },
        parent : false,
        currentSprite : "default",
        rollFactor : 0.1
    },
    dragon : {
        sprites : {
            default : {
                url : "dragon.png",
                px : {
                    width : 24,
                    height : 99
                },
                decvehicle : {
                    width : 24/30,
                    height : 1
                }
            }
        },
        mass : {
            dry : 3.9,
            fuel : 92.67
        },
        fuelConsumption : 0.233,
        thrust : {
            sealvl : 0,
            vac : 1,
        },
        engineNumber : 1,
        height : 8.1,
        width : 3.7,
        attachNodes : {
            bottom : {
                x : 0,
                y : 0
            }
        },
        parent : false,
        currentSprite : "default",
        rollFactor : 0.1
    },
}

let gameColors = {
    ground : "#4f941b",
    ocean  : "#123263"
}