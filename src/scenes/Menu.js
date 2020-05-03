class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('title', './assets/Title_Large.png');
        //this.load.image('start_button', './assets/start_button.png');

        //background images
        //this.load.image('backgroundTile', './assets/dirt.png');

        //placeholder images
        //Lines with a /*$*/ are still usimg placeholder assets
        /*$*/this.load.image('obstacle', './assets/placeholders/obstacle_placeholder.png');
        /*$*/this.load.image('invisible_wall', './assets/placeholders/invisible_wall.png');
        /*$*/this.load.image('invisible_wall_rotated', './assets/placeholders/invisible_wall_rotated.png');      
        /*$*/this.load.image('magic_missile', './assets/placeholders/magic_missile_placeholder.png');
        /*$*/this.load.image('magic_missile_blast', './assets/placeholders/magic_missile_blast_placeholder.png');
        /*$*/this.load.image('orc_punch', './assets/placeholders/orc_punch_placeholder.png');
        /*$*/this.load.image('skeleton_knight_boss', './assets/placeholders/skeleton_knight_boss_placeholder.png');
        /*$*/this.load.image('dominating_strike', './assets/placeholders/dominating_strike_placeholder.png');
        /*$*/this.load.image('sweeping_strike', './assets/placeholders/sweeping_strike_placeholder.png');
        /*$*/this.load.image('lashing_strike', './assets/placeholders/lashing_strike_placeholder.png');
        /*$*/this.load.image('magic_missile_particle', './assets/placeholders/magic_missile_particle_placeholder.png');

        //background images
        this.load.image('backgroundTile', './assets/dirt.png');

        //player images
        this.load.image('player', './assets/orc_monk.png');
        /*this.load.atlas({
            key: 'player',
            textureURL: './assets/characters/orc_monk.png',
            atlasURL: './assets/characters/orc_monk.json'
        });*/


        //attack images

        //obstacle images
        this.load.image('rock', './assets/rock_1.png');
        this.load.image('stalagmite', './assets/stalagmite_1.png');
        this.load.image('dirt_wall', './assets/dirt_wall_1.png');
        

        //enemy images
        this.load.image('zombie', './assets/zombie.png');

        //audio
        this.load.audio('bgm', './assets/sounds/BGM.mp3');
        this.load.audio('magic_missile_explosionSound', './assets/sounds/Magic Missile Explosion.mp3');
        this.load.audio('magic_missile_firingSound', './assets/sounds/Magic Missile Firing.mp3');
        this.load.audio('punchSound', './assets/sounds/Punch.mp3');
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
        ).setOrigin(0, 0).setScale(5.625);

        //setting background music
        this.music = this.sound.add('bgm');
        this.music.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        //listening for up key
        keyUP    =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

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
    }

    update(){
        this.background.tilePositionY -= .75;

        if(keyUP.isDown){
            this.scene.start("playScene");
        }
    }
    
}