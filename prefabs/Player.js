class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add to scene
        scene.add.existing(this);           //add the sprite
        scene.physics.add.existing(this);   //add the physics
        //set controls
        this.moveUp         =   keyUP;
        this.moveDown       =   keyDOWN;
        this.moveLeft       =   keyLEFT;
        this.moveRight      =   keyRIGHT;
        this.specialAttack  =   keyE;
        //player properties
        this.stunned = false;
        this.immune = false;
        this.speed = 250;
        this.score = 0;
        this.distance = 0;
        //attack cooldowns
        this.canSpecial = true;
    }

    update(){
        ++this.distance;

        //left-right movement
        if(!this.stunned && this.moveLeft.isDown){
            this.body.setVelocityX(-this.speed);
        }
        else if(!this.stunned && this.moveRight.isDown){
            this.body.setVelocityX(this.speed);
        }
        else{
            this.body.setVelocityX(0);
        }

        //up-down movement
        if(!this.stunned && this.moveUp.isDown){
            this.body.setVelocityY(-this.speed);
        }
        else if(!this.stunned && this.moveDown.isDown){
            this.body.setVelocityY(this.speed);
        }
        else{
            this.body.setVelocityY(0);
        }

        if(!this.stunned && this.specialAttack.isDown){
            this.magicMissileAttack();
        }

        if(this.y > config.height){
            this.defeat();
        }

    }

    //stuns the player for 1 second
    startStun(){
        if(!this.stunned && !this.immune){
            console.log("You've been stunned!");
            this.stunned = true;
            this.scene.time.delayedCall(250, () => {
                this.stunned = false;
                this.immune = true;
                console.log("Now you're immune!");
            }, null, this);
            this.scene.time.delayedCall(500, () => {
                this.immune = false;
            })
        }
    }

    defeat(){
        this.stunned = true;
        console.log("You lose!");
        console.log("Score: " + this.score);
        console.log("Distance: " + this.distance);
        this.scene.gameOver = true;
    }

    magicMissileAttack(){
        if(this.canSpecial){
            //create magic missile
            //new MagicMissile(this.scene, this.x+16, this.y-16, 'magic_missile', 0, 400)
            this.scene.attackGroup.add(new MagicMissile(
                this.scene, 
                this.x+16, 
                this.y-16, 
                'magic_missile', 
                0, 
                400
                )
            );
            //start cooldown
            this.canSpecial = false;
            this.scene.time.addEvent({
                delay: 4000,
                callback: function(){
                    this.canSpecial = true;
                    console.log("Magic Missle ready!");
                },
                callbackScope: this,
                loop: false
                //args: [],
                //callbackScope: this,
            })
        }
    }

    punchAttack(){

    }
}