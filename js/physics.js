function doHierarchySync(){
    for (object in dynObjects){
        if (dynObjects[object].parent != false){
            dynObjects[object].y = dynObjects[dynObjects[object].parent].y + dynObjects[dynObjects[object].parent].height/2;
        }
    }
}

Vehicle.prototype.doPhysics = function() {
    if (this.parent == false) {

    }

    else {

    }
};