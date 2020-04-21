class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    
    //for loading assets
    preload(){
        //placeholder tiles
        this.load.image('player', './assets/player_placeholder.png');
        this.load.image('backgroundTile', './assets/background_placeholder.png');
        this.load.image('obstacle', './assets/obstacle_placeholder.png');
    }

    //placing scene objects before game start
    create(){
        //setting background tiles
        this.background = this.add.tileSprite(0, 0, 32, 23, 'backgroundTile').setOrigin(0, 0).setScale(20);
        //setting keyboard controls
        keyLEFT  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP    =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    //called once a frame
    update(){
        this.background.tilePositionY -= 0.5;
    }
}