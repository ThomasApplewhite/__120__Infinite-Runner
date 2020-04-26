class OrcPunch extends Attack{
    constructor(scene, x, y, texture, frame, damage){
        super(scene, x, y, texture, frame);

        this.damage = damage;
        this.body.setImmovable();

        this.scene.time.addEvent({
            delay: 1/3 * 1000,       //active for 20 frames (1/3 of a second)
            callback: this.removeSelf,
            callbackScope: this,
            loops: false
        });
    }

    strike(target){
        if(target !== null){
            console.log("Punch has hit something");
            target.health -= this.damage;
        }
    }

    movementPattern(){
        //unlike most movement, the hitbox here MUST follow the player, 
        //  so its position is directly influenced
        this.x = this.scene.player.x + 16;
        this.y = this.scene.player.y - 16;
    }
}