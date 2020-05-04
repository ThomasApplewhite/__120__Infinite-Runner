class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');

        this.textConfig = {
            color: '#ffffff',
            align: 'left'
        }
        this.textSpace = 20;
        this.textShift = 20;
    }

    preload(){
        this.add.text(this.textShift, this.textSpace, "Loading images...", this.textConfig);
        this.textSpace += 20;

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
        //this.load.image('player', './assets/orc_monk.png');
        this.load.atlas({
            key: 'player',
            textureURL: './assets/characters/orc_monk.png',
            atlasURL: './assets/characters/orc_monk.json'
        });

        //attack images

        //obstacle images
        this.load.image('rock', './assets/rock_1.png');
        this.load.image('stalagmite', './assets/stalagmite_1.png');
        this.load.image('dirt_wall', './assets/dirt_wall_1.png');
        

        //enemy images
        this.load.image('zombie', './assets/zombie.png');


        this.add.text(this.textShift, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;
        this.add.text(this.textShift, this.textSpace, "Loading audio...", this.textConfig);
        this.textSpace += 20;

        //audio
        this.load.audio('bgm', './assets/sounds/BGM.mp3');
        this.load.audio('magic_missile_explosionSound', './assets/sounds/Magic Missile Explosion.mp3');
        this.load.audio('magic_missile_firingSound', './assets/sounds/Magic Missile Firing.mp3');
        this.load.audio('punchSound', './assets/sounds/Punch.mp3');
        //this.load.audio('spooky', './assets/sounds/Spooky.mp3');

        this.add.text(this.textShift, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;
    }

    create(){
        /*this.add.text(this.textShift, this.textSpace, "Mapping Controls...", this.textConfig);
        this.textSpace += 20;
        //setting keyboard controls
        keyLEFT  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP    =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyQ     =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);   //punch
        keyE     =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);   //magic missile
        this.add.text(this.textShift, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;*/

        this.add.text(this.textShift, this.textSpace, "Generating animations...", this.textConfig);
        this.textSpace += 20;

        //creating animations
        this.anims.create({
            key: 'orc_punchAnim',
            frameRate: 5,
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'back_punch'
            }),
            repeat: 0
        });

        this.anims.create({
            key: 'orc_stunAnim',
            frameRate: 5,
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'back_stun'
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'orc_walkAnim',
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 8,
                prefix: 'back_walk'
            }),
            repeat: -1
        });
        this.add.text(this.textShift, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;

        this.time.addEvent({
            delay: 3000,
            callback: () => {this.scene.start("menuScene");},
            loop: false,
        });
        
        //this.spook = this.sound.add('spooky');
        //this.spook.play();
    }

    update(){
        this.add.text(this.textShift, this.textSpace, "Opening the pit...", this.textConfig);
        this.textSpace += 20;
        if(this.textSpace > game.config.height){
            this.textSpace = 20;
            this.textShift += 200;
        }
    }
}