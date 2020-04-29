class Zombie extends Enemy{
    constructor(scene, x, y, texture, frame, health, points){
        super(scene, x, y, texture, frame, health, points);

        this.speed = 250;
        this.body.setBounce(0, 0);
    }

    //frame-by-frame movement
    //the movement right now is REALLY stiff. I might need some time to clean this up
    movementPattern(){
        this.body.setAcceleration(0, 0);
        //if the zombie passes the player...
        if(this.y > this.scene.player.y){
            //run off the screen. It looks really weird tho.
            this.body.setVelocityY(this.speed);
            this.body.setDragX(this.speed);
        }else{                                                           //accel rate  max x speed   max y speed
            this.scene.physics.accelerateToObject(this, this.scene.player, 10000, this.speed/2, this.speed);
        }
    }

    //what happens when the enemy collides with the player
    //  other forms of attack should go in attackPattern
    onAttack(player){
        player.startStun(250);
    }
}