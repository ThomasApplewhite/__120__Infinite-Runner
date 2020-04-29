class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, health, points){
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.health = health;
        this.points = points;
        this.attackPattern();
    }

    update(){
        this.movementPattern();

        if(this.health <= 0){
            this.onDeath();
            this.scene.player.score += this.points;
            this.destroy();
        }

        if(this.y > game.config.height){
            this.destroy();
        }
    }

    //frame-by-frame movement
    movementPattern(){

    }

    //how the enemy will specificly attack, if at all
    attackPattern(){

    }

    //what happens when the enemy collides with the player
    //  other forms of attack should go in attackPattern
    onAttack(){

    }

    //anything special that happens when the enemy dies
    onDeath(){
        ++this.scene.player.bodyCount;
    }
}