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
        this.load.image('invisible_wall', './assets/invisible_wall.png');
        this.load.image('invisible_wall_rotated', './assets/invisible_wall_rotated.png');
    }

    //placing scene objects before game start
    create(){
        //setting keyboard controls
        keyLEFT  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP    =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN  =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //setting background tiles
        this.background = this.add.tileSprite(0, 0, 32, 23, 'backgroundTile').setOrigin(0, 0).setScale(20);
        //creating invisible walls
        //don't forget to make these, ya know, actually invisible
        this.invisibleWallsGroup = this.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            active: true,
            runChildUpdate: false
        }).addMultiple([
            this.physics.add.sprite((config.width/6)-100, config.height/2, 'invisible_wall').setImmovable(),
            this.physics.add.sprite((config.width*5/6)+100, config.height/2, 'invisible_wall').setImmovable(),
            this.physics.add.sprite(config.width/2, 0, 'invisible_wall_rotated').setImmovable()
        ]);
        //this.invisLEFT = this.physics.add.sprite((config.width/6)-100,config.height/2, 'invisible_wall').setImmovable();
        //creating the player
        this.player = new Player(
            this, 
            config.width/2, 
            config.height*5/6, 
            'player',
            0
            ).setOrigin(0, 0);
        //creating the group to hold all the obstacles
        this.obstacleGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite.Obstacle,
            defaultKey: null,               //default texture to use
            defaultFrame: null,             //default animation frame start to use
            active: true,
            maxSize: 10,
            runChildUpdate: true,
            createCallback: null,           //what to do when an object is added to the group
            removeCallback: null,           //what to do when an object is removed from the group
            createMultipleCallback: null    //what to do when multiple objects are added to the group
        })
        //creating colliders
        this.physics.add.collider(this.player, this.obstacleGroup, function(player){
            player.startStun();
        });
        this.physics.add.collider(this.player, this.invisibleWallsGroup);
        //game-over flag
        this.gameOver = false;
    }

    //called once a frame
    update(){
        //background scrolling
        this.background.tilePositionY -= 0.5;
        if(!this.gameOver){
            //entity updating
            this.player.update();

            //ideally this happens at a larger time-based interval, but
            //  I can't figure that out yet
            this.createObstacle();
        }
    }

    createObstacle(){
        if(!this.obstacleGroup.isFull()){
            this.obstacleGroup.add(new Obstacle(
                this, 
                Phaser.Math.Between(config.width/6, config.width*5/6), 
                0, 
                'obstacle'
                )
            );
        }
    }
}