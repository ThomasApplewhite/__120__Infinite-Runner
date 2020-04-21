/*
Header Commend Goes Here
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 460,
    scene: [ Play ]
}

let game = new Phaser.Game(config);
game.settings = {
}

//reserving keyboard keys
let keyLEFT, keyRIGHT, keyUP, keyDOWN;

//don't forget to use python -m http.server to start the terminal server B