class MagicMissile extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, range){
        super(scene, x, y, texture, frame);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //this is here because detonate() can get its scope confused a lot
        this.me = this
        this.range = range;
        this.damage = 5;
        this.body.setVelocityY(-300);
        console.log(this.body);

        //I'd really like to group these two together but uhhhh
        this.missileCheckingEnemies = this.scene.physics.add.collider(this, this.scene.enemyGroup, this.detonate);
        this.missileCheckingObstacles = this.scene.physics.add.collider(this, this.scene.obstacleGroup, this.detonate);
    }

    update(){
        if(this.y < this.y - 100){
            this.detonate();
        }

        if(this.y < 0){
            this.removeSelf();
        }
    }

    detonate(){
        //stop
        console.log(me);
        console.log(me.body);
        //this.body.setVelocityY(0);        this one's being weird
        //become invisible
        //this.setVisible(false);           this one's being weird
        //create the blast
        new MagicMissileBlast(me.scene, me.x, me.y, 'magic_missile_blast', 0, me.damage);
        //cease to be
        this.removeSelf();
    }

    removeSelf(){
        //this.missileCheckingEnemies.destroy();
        //this.missileCheckingObstacles.destroy();
        console.log("removing self");
        this.destroy();
    }
}