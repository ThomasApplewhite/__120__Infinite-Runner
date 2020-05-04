class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');

        this.textConfig = {
            color: '#ffffff',
            align: 'left'
        }
        this.textSpace = 20;
        this.textShift = 20;

        this.starting = false;
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
        /*$*/
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
        this.load.image('magic_missile', './assets/missle.png');

        //obstacle images
        this.load.image('rock', './assets/rock1.png');
        this.load.image('stalagmite', './assets/rock2.png');
        this.load.image('dirt_wall', './assets/dirt_wall_1.png');
        

        //enemy images
        this.load.image('zombie', './assets/zombie.png');

        //UI images
        this.load.image('heartUI', './assets/heart.png');
        this.load.image('magic_missileUI', './assets/missle_charge.png');


        this.add.text(this.textShift, this.textSpace, "Complete", this.textConfig);
        this.textSpace += 20;
        this.add.text(this.textShift, this.textSpace, "Loading audio...", this.textConfig);
        this.textSpace += 20;

        //audio
        this.load.audio('bgm', './assets/sounds/BGM.mp3');
        this.load.audio('magic_missile_explosionSound', './assets/sounds/Magic Missile Explosion.mp3');
        this.load.audio('magic_missile_firingSound', './assets/sounds/Magic Missile Firing.mp3');
        this.load.audio('punchSound', './assets/sounds/Punch.mp3');
        this.load.audio('bossLaugh', './assets/sounds/Boss Laugh.mp3');

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

        keyQ     =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

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
        
        //fun stuff for load screen
        this.messages = new Array(
            'Prepare for undead...',
            'Opening the pit...',
            'The gates are opening...', 
            'The Darkworld beckons...',
            'Damning your soul...',
            'Raising the dead...',
            'Sealing the pact...',
            'You won’t escape...',
            'There’s no salvation...',
            'Hook doesn’t hurt...',
            'Crimson brings pain...',
        );

        this.nextSceneTime = this.time.addEvent({
            delay: 3000,
            callback: () => {
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
                this.scene.start("menuScene");},
            loop: false,
        });
        this.nextSceneTime.paused = true;

        this.add.text(this.textShift, this.textSpace, "Press (Q) to Continue...", this.textConfig);
        this.textSpace += 20;
    }

    update(){
        if(keyQ.isDown){
            this.oneShotStarts();
            this.starting = true;
        }

        if(this.starting){
            this.add.text(this.textShift, this.textSpace, Phaser.Math.RND.pick(this.messages), this.textConfig);
            this.textSpace += 20;
            if(this.textSpace > game.config.height){
                this.textSpace = 20;
                this.textShift += 200;
            }
        }
    }

    oneShotStarts(){
        if(!this.starting){
            this.sound.add('bossLaugh').play({volume: 0.25});
            this.nextSceneTime.paused = false;
        }
    }
}