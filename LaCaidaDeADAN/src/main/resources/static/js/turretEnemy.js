import Enemy from "./enemy.js";

class TurretEnemy extends Enemy{
    constructor(scene){
        super(scene, 0, 0);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'enemyWalkin');
        
        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };

        

        scene.anims.create({
            key:'walking',
            frames: this.anims.generateFrameNumbers('enemyWalkin', {start: 0, end: 6}),
            frameRate: 20,
            repeat: -1
        });
        
        scene.anims.create({
            key:'fire',
            frames: this.anims.generateFrameNumbers('enemyWalkin', {start:7, end:8}),
            frameRate: 2,
            repeat: -1
        })

        this.speed = 8/100000;
        this.maxHP = 100;
        this.currentHP = this.maxHP;
        this.damageAmmount = 1; // TO CHANGE
        this.moneyGiven = 10;
        this.range = 350;
        this.ranged = true;
        this.attackSpeed = 7;
        this.type = "range";
        this.offset = 5;
    }

    animateWalk(){
        this.anims.play('walking', true);
    }

    animateFire(){
        this.anims.play('fire', true);
    }

    fire() { 
            this.anims.stop('walking');
            this.anims.play('fire', true);
            var angle = Phaser.Math.Angle.Between(this.follower.vec.x, this.follower.vec.y, 1856/2, 896/2);
            this.scene.addEnemyBullet(this.follower.vec.x, this.follower.vec.y, angle, this.damageAmmount);
            this.scene.sound.play('turretShoot', {volume: 0.2});
            //this.angle = (angle, Math.PI/2) * Phaser.Math.RAD_TO_DEG;
    }
 }
 
 export default TurretEnemy;