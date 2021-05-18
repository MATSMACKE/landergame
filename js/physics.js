"use strict";

function syncHierarchy(){
    for (let object in dynObjects){
        let thisObject = dynObjects[object];
        if (thisObject.parent) {
            let parentObject = dynObjects[thisObject.parent];

            let distance = parentObject.attachNodes[thisObject.connection[0]].y/2 - 
            thisObject.attachNodes[thisObject.connection[1]].y/2 + 
            thisObject.height/2;

            thisObject.y = parentObject.y + distance * sin(90-parentObject.angle);

            thisObject.x = parentObject.x + distance * cos(90-parentObject.angle);

            thisObject.angle = parentObject.angle;
        }
    }
}

let envStat = {
    GRAVITY : 9.81
}

function doPhysics() {
    for (let object in dynObjects) {
        dynObjects[object].doPhysics();
    }
}

Vehicle.prototype.doPhysics = function() {
    if (this.parent === null) {
        this.doMechanics();
        //p(dynObjects.f9s2.angle);
        if (this.id == activeObject) {
            if (inputs.throttle) {
                this.calcThrust(inputs.throttle);
            }
            if (inputs.rollThrottle) {
                this.calcRollThrust();
            }
        }
    }

    else {
        return;
    }
};

Vehicle.prototype.doMechanics = function() {
    this.velocity.x += 0.02*(-0*calcDrag(1, this.velocity.x, 0.0001, 3.7, 47.7, this.angle, this.mass.dry + this.mass.fuel));
    this.velocity.y += 0.02*(-0*calcDrag(1, this.velocity.x, 0.0001, 47.7, 3.7, this.angle, this.mass.dry + this.mass.fuel) - envStat.GRAVITY);

    this.x += 0.02 * this.velocity.x;
    this.y += 0.02 * this.velocity.y;

    this.angle += this.velocity.angular;
}

Vehicle.prototype.calcThrust = function (throttle) {
    let thrust = throttle * this.thrust.sl/((this.mass.dry + this.mass.fuel) * 50);
    this.velocity.y += thrust * sin(90-this.angle);
    this.velocity.x += thrust * cos(90-this.angle);
}

Vehicle.prototype.calcRollThrust = function() {
    this.velocity.angular += inputs.rollThrottle*this.rollFactor/50;
}

function calcDrag(density, vel, coefficient, height, width, angle, mass) {
    let area = 8;
    return (coefficient *((density * vel*vel)/2) * area);
}

Vehicle.prototype.calcDensity = function() {
    this.density = 1;
}