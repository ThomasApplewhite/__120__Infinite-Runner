class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    
    //for loading assets
    preload(){
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

        //background images
        this.load.image('backgroundTile', './assets/dirt.png');

        //player images
        this.load.image('player', './assets/orc_monk.png');

        //attack images

        //obstacle images
        this.load.image('rock', './assets/rock_1.png');
        this.load.image('stalagmite', './assets/stalagmite_1.png');
        this.load.image('dirt_wall', './assets/dirt_wall_1.png');
        this.obstacleList = ['rock', 'stalagmite', 'dirt_wall'];

        //enemy images
        this.load.image('zombie', './assets/zombie.png');
    }

    //placing scene objects before game start
    create(){
        //setting keyboard controls
        keyLEFT  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP    =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyQ     =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE     =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);   //magic missile
        
        //setting background tiles
        this.background = this.add.tileSprite(
            0, 
            0, 
            config.width/2, 
            config.height/2, 
            'backgroundTile'
            ).setOrigin(0, 0).setScale(5.625);
        
        //creating the player
        this.player = new Player(
            this, 
            config.width/2, 
            config.height*2/3, 
            'player',
            0
            ).setOrigin(0, 0);
        
        //creating object groups
        this.defineGroups();

        //creating spawning timers
        this.defineSpawnTimers();
        
        //creating colliders
        this.defineColliders();
        
        //game-over flag
        this.gameOver = false;

        //boss-spawning variables
        this.bossLevel = 3;         //should start at 1
        this.killsUntilBoss = 3;    //should start at 15
        this.bossActive = false;
    }

    //called once a frame
    update(){
        //background scrolling
        this.background.tilePositionY -= .75;

        //game functionality
        if(!this.gameOver){
            //entity updating
            this.player.update();

            //check to spawn boss
            if(!this.bossActive && this.killsUntilBoss < this.player.bodyCount){
                this.enemyGroup.add(new SkeletonKnightBoss(
                    this,                                   //scene
                    config.width/2,                         //x
                    -100,                                    //y
                    'skeleton_knight_boss',                   //sprite
                    0,                                      //start frame of anim
                    )
                );
            }
        }
    }

    createObstacle(){
        let obstacle = this.obstacleList[Phaser.Math.Between(0, this.obstacleList.length-1)];
        if(!this.gameOver && !this.obstacleGroup.isFull()){
            this.obstacleGroup.add(new Obstacle(
                this,                                   //scene
                Phaser.Math.Between(0, config.width),   //x
                -32,                                    //y
                obstacle                                //sprite
                )
            );
        }
    }

    createEnemy(){
        if(!this.gameOver && !this.enemyGroup.isFull()){
            this.enemyGroup.add(new Zombie(
                this,                                   //scene
                Phaser.Math.Between(0, config.width),    //x
                -32,                                    //y
                'zombie',                               //sprite
                0,                                      //start frame of anim
                )
            );
        }
    }

    finishGame(){
        let scores = this.player.exportScores();
        game.registry.set("score", scores[0]);
        game.registry.set("distance", scores[1]);
        game.registry.set("bodyCount", scores[2]);
        this.scene.start("endScene");
    }

    //And now, a whole bunch of loading methods. Might just do this in a different file... nah...
    defineGroups(){
        //creating invisible walls
        //don't forget to make these, ya know, actually invisible
        this.invisibleWallsGroup = this.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            active: true,
            runChildUpdate: false
        }).addMultiple([
            this.physics.add.sprite(-50, config.height/2, 'invisible_wall').setImmovable().setVisible(false),
            this.physics.add.sprite(config.width+50, config.height/2, 'invisible_wall').setImmovable().setVisible(false),
            //this.physics.add.sprite(config.width/2, (config.height/3)-50, 'invisible_wall_rotated').setImmovable().setVisible(false)
        ]);
        
        //creating the group to hold all the obstacles
        this.obstacleGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite.Obstacle,
            defaultKey: null,               //default texture to use
            defaultFrame: null,             //default animation frame start to use
            active: true,
            maxSize: 15,
            runChildUpdate: true,
            createCallback: null,           //what to do when an object is added to the group
            removeCallback: null,           //what to do when an object is removed from the group
            createMultipleCallback: null    //what to do when multiple objects are added to the group
        });

        //creating the group to hold all the enemies
        this.enemyGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite.Enemy,
            active: true,
            maxSize: 5,
            runChildUpdate: true
        });

        //creating the group to hold all the attacks
        this.attackGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            active: true,
            maxSize: -1,
            runChildUpdate: true
        });        
    }

    defineSpawnTimers(){
        //obstacle spawning timer
        this.obstacleSpawnTimer = this.time.addEvent({
            delay: 250,                // ms
            callback: this.createObstacle,
            //args: [],
            callbackScope: this,
            loop: true
        });
        
        //enemy spawning timer
        this.enemySpawnTimer = this.time.addEvent({
            delay: 750,
            callback: this.createEnemy,
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    defineColliders(){
        this.physics.add.collider(this.player, this.obstacleGroup, function(player){
            player.startStun(250);
        });
        this.physics.add.collider(this.player, this.enemyGroup, function(player, enemy){
            enemy.onAttack(player);
        });
            //bUt tHOMAs tHiS Is AN oVeRlAP!!!1!111!! fuck outta here
            //fuck outta here colliders are ineffective
        this.physics.add.overlap(this.attackGroup, this.enemyGroup, function(attack, enemy){
            attack.strike(enemy);
        })
        this.physics.add.overlap(this.attackGroup, this.obstacleGroup, function(attack, enemy){
            //to simulate that it has struck nothing
            attack.strike(null);
        })
        this.physics.add.overlap(this.attackGroup, this.player, function(attack, player){
            //to simulate that it has struck nothing
            attack.strike(player);
        })
        //creating colliders for things that just need to collide
        this.physics.add.collider(this.player, this.invisibleWallsGroup);
        this.physics.add.collider(this.enemyGroup, this.obstacleGroup);
        this.physics.add.collider(this.enemyGroup, this.enemyGroup);
        //this.physics.add.collider(this.enemyGroup, this.invisibleWallsGroup);
    }
}