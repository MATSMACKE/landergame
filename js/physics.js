function doHierarchySync(){
    for (object in dynObjects){
        if (dynObjects[object].parent != false){
            dynObjects[object].y += dynObjects[object].highestParent.y;
        }
    }
}

Vehicle.prototype.doPhysics = function() {
    if (this.parent == false) {

    }

    else {

    }
};