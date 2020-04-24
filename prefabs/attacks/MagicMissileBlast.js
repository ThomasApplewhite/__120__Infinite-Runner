class MagicMissileBlast extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, damage){
        super(scene, x, y, texture, frame);

        //this will be ugly because this object does one thing and then dies
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);

        /*this.blastChecking = this.scene.physics.add.collider(this.scene.enemyGroup, this, function(enemy){
            enemy.health -= damage;
        });*/
        console.log("creating blast");
        this.scene.time.delayedCall({
            delay: 250,
            callback: function(){
                console.log("destroying blast");
                this.blastChecking.destroy();
                this.destroy();
            },
            //args []
            callbackScope: this
        });
    }
}