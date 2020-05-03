/*
Header Commend Goes Here
*/

let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 768,
    scene: [ Menu, Play, End ],
    physics:{
        default: "arcade",
        arcade:{
            debug: false
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

let game = new Phaser.Game(config);
game.settings = {
}

//setting magic missile particle emitter
/*let mmParticleConfig = {

}*/

//defining registry values
game.registry.set("score", 0);
game.registry.set("distance", 0);
game.registry.set("bodyCount", 0);
//game.registry.set("magicMissileParticle", mmParticleConfig);

//reserving keyboard keys
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyQ, keyE;

if (game.sound.context.state === 'suspended') {
    game.sound.context.resume();
}

//don't forget to use python -m http.server to start the terminal server B