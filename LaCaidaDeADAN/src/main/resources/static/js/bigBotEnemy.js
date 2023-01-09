import Enemy from "./enemy.js";

class BigBotEnemy extends Enemy{
    constructor(scene){
        super(scene, 0, 0)
        
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bigRobot');

        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };
        

        scene.anims.create({
            key:'walkingBot',
            frames: this.anims.generateFrameNumbers('bigRobot', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'attackBigBot',
            frames: this.anims.generateFrameNumbers('bigRobot', {frames: [6,7,8,9,10,11, 0]}),
            framerate: 5,
            repeatDelay: 1500,
            repeat: -1
        });

        this.speed = 5/100000;
        this.maxHP = 200;
        this.currentHP = this.maxHP;
        this.damageAmmount = 4;
        this.moneyGiven = 4;
        this.range = 128;
        this.ranged = false;
        this.attackSpeed = 15;
        this.offset = 35;
        this.type = "big";
    }

    animateWalk(){
        this.anims.play('walkingBot', true);
    }

    fire() {
        this.anims.stop('walkingBot');
        this.anims.play('attackBigBot', true);
        //this.anims.playAfterDelay('attackBigBot', 1500);
        var angle = Phaser.Math.Angle.Between(this.follower.vec.x, this.follower.vec.y, 1856/2, 896/2);
        this.scene.addEnemyBullet(this.follower.vec.x, this.follower.vec.y, angle, this.damageAmmount);

    }
 }
 
 export default BigBotEnemy;