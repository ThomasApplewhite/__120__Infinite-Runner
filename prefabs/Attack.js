class Attack extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //this.effected = new Array();
    }

    update(){
        this.movementPattern();
    }

    //what happens when the attack collides with a target
    strike(target){
        this.removeSelf();
    }

    //frame-by-frame movement
    movementPattern(){

    }

    //what happens when this attack is finished
    removeSelf(){
        this.destroy();
    }
}