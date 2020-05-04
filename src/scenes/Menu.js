class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){

    }

    create(){
        //setting text properties
        let textConfig = {
            fontFamily: 'PermanentMarker',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#2ACADB',
            align: 'center',
            padding: {
                top: 5,
                bototm: 5,
            },
            stroke: '#000000',
            strokeThickness: 10,
            fixedWidth: 0
        }

        //setting background tiles
        this.background = this.add.tileSprite(
            0, 
            0, 
            config.width/2, 
            config.height/2, 
            'backgroundTile'
        ).setOrigin(0, 0).setScale(4);

        /*//setting background music
        this.music = this.sound.add('bgm');
        this.music.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });*/

        //listening for up and down key
        keyUP    =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 48;

        this.add.text(centerX, centerY + 0 * textSpacer, '-Move with the Arrow Keys-', textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 1 * textSpacer, '-Press (Q) to Punch-', textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 2 * textSpacer, '-Press (E) to cast Magic Missile-', textConfig).setOrigin(0.5);
        textConfig.color = '#C756E3';
        this.add.text(centerX, centerY + 3 * textSpacer, '>Avoid the Obstacles<', textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 4 * textSpacer, '>Slay your Foes<', textConfig).setOrigin(0.5);
        textConfig.color = '#D62109';
        this.add.text(centerX, centerY + 5 * textSpacer, '==Press the Up Arrow to Start==', textConfig).setOrigin(0.5);

        this.add.sprite(centerX, game.config.height/4, 'title');
        //this.add.sprite(centerX, game.config.height * 7/8, 'start_button').setScale(2);
        //credits text
        this.add.text(game.config.width - 75, game.config.height - 50, 'Press the\n Down Arrow\n for Credits',{
            fontFamily: 'PermanentMarker',
            fontSize: '14px',
            //backgroundColor: '#F3B141',
            color: '#ff9900',
            align: 'right',
            padding: {
                top: 5,
                bototm: 5,
            },
            stroke: '#000000',
            strokeThickness: 10,
            fixedWidth: 0
        }).setOrigin(0.5);
    }

    update(){
        this.background.tilePositionY -= 1;

        if(keyUP.isDown){
            this.scene.start("playScene");
        }

        if(keyDOWN.isDown){
            this.scene.start("creditsScene");
        }
    }
    
}