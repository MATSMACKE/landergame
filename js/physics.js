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
        console.log("e");
    }
}

Vehicle.prototype.doPhysics = function() {
    if (this.parent == false) {
        this.doMechanics();
        console.log("f");
    }

    else {
        console.log("g");
        return;
    }
};

Vehicle.prototype.doMechanics = function() {
    this.velocity.x += 0;
    this.velocity.y += -1 * gravity;

    this.x += this.velocity.x/50;
    this.y += this.velocity.y/50;

    this.angle += this.velocity.angular;

    console.log(gravity);
}