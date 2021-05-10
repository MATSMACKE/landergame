function doHierarchySync(){
    for (object in dynObjects){
        var thisObject = dynObjects[object];
        if (thisObject.parent != false){
            var parentObject = dynObjects[dynObjects[object].parent];

            var distance = parentObject.attachNodes[thisObject.connection[0]].y/2 - 
            thisObject.attachNodes[thisObject.connection[1]].y/2 + 
            thisObject.height/2;

            thisObject.y = parentObject.y + distance * sin(90-parentObject.angle);

            thisObject.x = parentObject.x + distance * cos(90-parentObject.angle);

            thisObject.angle = parentObject.angle;
        }
    }
}

const gravity = 9.81;

function doPhysics() {
    for (object in dynObjects) {
        dynObjects[object].doPhysics();
    }
}

Vehicle.prototype.doPhysics = function() {
    if (this.parent == false) {
        this.doMechanics();
        if (throttle > 0) {
            this.calculateThrust(throttle);
        }
        if (rollThrottle != 0) {
            this.calculateRollThrust(rollThrottle);
        }
    }

    else {
        return;
    }
};

Vehicle.prototype.doMechanics = function() {
    this.velocity.x += 0;
    this.velocity.y += -0.02 * gravity;

    this.x += 0.02 * this.velocity.x;
    this.y += 0.02 * this.velocity.y;

    this.angle += this.velocity.angular;
}

Vehicle.prototype.calculateThrust = function (throttle) {
    var thrust = this.thrust.sealvl/((this.mass.dry + this.mass.fuel) * 50);
    this.velocity.y += thrust * sin(90-this.angle);
    this.velocity.x += thrust * cos(90-this.angle);
}

Vehicle.prototype.calculateRollThrust = function(rollThrottle) {
    this.velocity.angular += rollThrottle*this.rollFactor/50;
}