class Player extends Phaser.GameObject.Sprite{
    constructor(x, y, texture, frame){
        super(x, y, texture, frame);

        scene.add.existing(this);
        //set controls
        this.moveUp     =   keyUP;
        this.moveDown   =   keyDOWN;
        this.moveLeft   =   keyLEFT;
        this.moveRight  =   keyRIGHT;
        //player properties
        this.stunned = false;
    }

    update(){
        //left-right movement
        if(!this.stunned && this.moveLeft.keyDown){
            //move left
        }
        else if(!this.stunned && this.moveRight.keyDown){
            //move right
        }

        //up-down movement
        if(!this.stunned && this.moveUp.keyDown){
            //move up
        }
        else if(!this.stunned && this.moveDown.keyDown){
            //move down
        }
    }
}