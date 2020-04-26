class MagicMissileBlast extends Attack{
    constructor(scene, x, y, texture, frame, damage){
        super(scene, x, y, texture, frame);

        this.damage = damage;
        this.body.setImmovable();
        //this.body.onOverlap = true;

        this.scene.time.addEvent({
            delay: 250,
            callback: this.removeSelf,
            callbackScope: this,
            loop: false
            }
        )

        //this will be ugly because this object does one thing and then dies
        /*this.blastChecking = this.scene.physics.add.collider(this.scene.enemyGroup, this, function(enemy){
            enemy.health -= damage;
        });*/
        /*console.log("creating blast");
        this.scene.time.delayedCall({
            delay: 250,
            callback: function(){
                console.log("destroying blast");
                this.blastChecking.destroy();
                this.destroy();
            },
            //args []
            callbackScope: this
        });*/
    }

    strike(target){
        if(target !== null){
            console.log("Blast has hit something");
            target.health -= this.damage;
        }
    }
}