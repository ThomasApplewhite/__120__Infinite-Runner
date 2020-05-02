class SkeletonKnightBoss extends Enemy{
    constructor(scene, x, y, texture, frame, level){
        super(scene, x, y, texture, frame, 100, 100);

        this.attackTimer;
        this.level = level;

        this.scene.obstacleSpawnTimer.paused = true;
        this.scene.enemySpawnTimer.paused = true;

        this.body.setImmovable();

        this.scene.bossActive = true;

        this.scene.physics.moveTo(this, config.width/2, 100, 125);
        //this.body.setVelocityY(0);

        console.log("Boss Level: " + this.level);
    }

    //how the enemy will specificly attack, if at all
    attackPattern(){
        console.log("Starting attack timer!");
        //five seconds between attacks, use attacks based on level
        this.attackTimer = this.scene.time.addEvent({
            delay: 6000,            //5 seconds
            callback: this.pickAttack,
            //args: [],
            callbackScope: this,
            loop: true,
            startAt: 1000
        });
    }

    //I wish there was a better way to do this, but moveTo won's stop anything so...
    movementPattern(){
        if(this.y >= 100){
            this.body.setVelocityY(0);
        }
    }
    
    //anything special that happens when the enemy dies
    onDeath(){
        //update player score
        ++this.scene.player.bodyCount;
        this.scene.player.score += this.points;

        //update boss scene variables
        this.scene.killsUntilBoss = this.scene.player.bodyCount + 15;
        //++this.bossLevel;
        this.bossLevel = true;

        this.scene.obstacleSpawnTimer.paused = false;
        this.scene.enemySpawnTimer.paused = false;

        this.attackTimer.remove();
    }

    pickAttack(){
        console.log("SkeletonKnight Health:" + this.health);
        if(this.level > 3){
            this.level = 3;
        }
        
        
        let attackCall = Phaser.Math.Between(1, 3);
        console.log("Attack Calling: " + attackCall);
        
        if(attackCall == 3){
            this.lashingStrike();
        }
        else if(attackCall == 2){
            this.sweepingStrike();
        }
        else{
            this.dominatingStrike();
        }

    }

    dominatingStrike(){
        let attackSpacer = Phaser.Math.Between(1, 3);
        if(attackSpacer == 1){
            attackSpacer = game.config.width/6;
        }
        else if( attackSpacer == 2){
            attackSpacer = game.config.width/2;
        }
        else{
            attackSpacer = game.config.width*5/6;
        }
        let attack = new DominatingStrike(this.scene, attackSpacer, game.config.height/2, 'dominating_strike', 0);
        this.scene.attackGroup.add(attack);
    }

    sweepingStrike(){
        let attack = new DominatingStrike(this.scene, this.x, this.y+100, 'sweeping_strike', 0, 1);
        this.scene.attackGroup.add(attack);
    }

    lashingStrike(){
        let attack = new LashingStrike(this.scene, this.x, this.y+125, 'lashing_strike');
        this.scene.attackGroup.add(attack);
    }
}