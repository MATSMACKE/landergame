function doHierarchySync(){
    for (object in dynObjects){
        if (dynObjects[object].parent != false){
            var thisObject = dynObjects[object];
            var parentObject = dynObjects[dynObjects[object].parent];
            dynObjects[object].y = parentObject.y + parentObject.attachNodes[thisObject.connection[0]].y/2 - thisObject.attachNodes[thisObject.connection[1]].y/2 + thisObject.height/2;
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
            this.calculateThrust(1);
        }
        if (rollThrottle != 0) {
            this.calculateRollThrust();
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
    this.velocity.y += this.thrust.sealvl/((this.mass.dry + this.mass.fuel) * 50);
}