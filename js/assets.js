var assets = {
    f9s1 : {
        sprites : {
            default : {
                url : "f9legsin.png",
                px : {
                    width : 90,
                    height : 297
                },
                decvehicles : {
                    width : 0.247,
                    height : 0.974
                }
            },
            status2 : {
                url : "f9legsout.png",
                px : {
                    width : 90,
                    height : 297
                },
                decvehicles : {
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
        diameter : 3.7,
        attachNodes : {
            top : {
                x : 1.85,
                y : 47.7
            }
        },
        parent : false,
        currentSprite : "default"
    },
    f9s2 : {
        sprites : {
            default : {
                url : "f9s2.png",
                px : {
                    width : 24,
                    height : 99
                },
                decvehicle : {
                    width : 0.925,
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
        diameter : 3.7,
        attachNodes : {
            top : {
                x : 1.85,
                y : 47.7
            },
            bottom : {

            }
        },
        parent : false,
        currentSprite : "default"
    },
    dragon : {
        sprites : {
            default : {
                url : "dragon.png",
                px : {
                    width : 24,
                    height : 99
                },
                decvehicles : {
                    width : 0,
                    height : 0
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
        diameter : 3.7,
        attachNodes : {
            bottom : {
                x : 1.85,
                y : 47.7
            }
        },
        parent : false,
        currentSprite : "default"
    },
}

var gameColors = {
    ground : "#318c3b",
    ocean  : "#154e7d"
}