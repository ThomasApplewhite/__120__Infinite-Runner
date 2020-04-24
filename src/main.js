/*
Header Commend Goes Here
*/

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [ Play ],
    physics:{
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}

let game = new Phaser.Game(config);
game.settings = {
}

//reserving keyboard keys
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyQ, keyE;

//don't forget to use python -m http.server to start the terminal server B