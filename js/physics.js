function doHierarchySync(){
    for (object in dynObjects){
        if (dynObjects[object].parent != false){
            var thisObject = dynObjects[object];
            var parentObject = dynObjects[dynObjects[object].parent];
            dynObjects[object].y = parentObject.y + parentObject.attachNodes[thisObject.connection[0]].y/2 - thisObject.attachNodes[thisObject.connection[1]].y/2 + thisObject.height/2;
        }
    }
}

Vehicle.prototype.doPhysics = function() {
    if (this.parent == false) {

    }

    else {

    }
};