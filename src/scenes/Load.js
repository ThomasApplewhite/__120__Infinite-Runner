class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');

        this.textConfig = {
            color: '#ffffff',
            align: 'left'
        }
        this.textSpace = 20;
        this.textShift = 100;
    }

    preload(){
        this.add.text(100, this.textSpace, "Loading images...", this.textConfig);
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


        this.add.text(100, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;
        this.add.text(100, this.textSpace, "Loading audio...", this.textConfig);
        this.textSpace += 20;

        //audio
        this.load.audio('bgm', './assets/sounds/BGM.mp3');
        this.load.audio('magic_missile_explosionSound', './assets/sounds/Magic Missile Explosion.mp3');
        this.load.audio('magic_missile_firingSound', './assets/sounds/Magic Missile Firing.mp3');
        this.load.audio('punchSound', './assets/sounds/Punch.mp3');
        this.add.text(100, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;
        this.add.text(100, this.textSpace, "Generating animations...", this.textConfig);
        this.textSpace += 20;
        
    }

    create(){
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
            frameRate: 5,
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 8,
                prefix: 'back_walk'
            }),
            repeat: -1
        });
        this.add.text(100, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;

        this.time.addEvent({
            delay: 3000,
            callback: () => {this.scene.start("menuScene");},
            loop: false,
        });
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