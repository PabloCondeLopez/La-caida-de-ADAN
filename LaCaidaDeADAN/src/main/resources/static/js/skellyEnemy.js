import Enemy from "./enemy.js";

class SkellyEnemy extends Enemy{
    constructor(scene){
        super(scene, 0, 0)
        
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'skellyBot');

        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };

        scene.anims.create({
            key:'walkSkelly',
            frames: this.anims.generateFrameNumbers('skellyBot', {start: 0, end: 4}),
            frameRate: 15,
            repeat: -1
        });

        scene.anims.create({
            key: 'attackSkelly',
            frames: this.anims.generateFrameNumbers('skellyBot', {frames:[5,6,7,8,0]}),
            framerate: 15,
            repeatDelay: 700,
            repeat: -1
        });

        this.speed = 8/100000;
        this.maxHP = 100;
        this.currentHP = this.maxHP;
        this.damageAmmount = 2; // TO CHANGE
        this.moneyGiven = 10;
        this.range = 128;
        this.ranged = false;
        this.attackSpeed = 10;
        this.type = "skelly";
        this.offset = 20;
    }

    animateWalk(){
        this.anims.play('walkSkelly', true);
    }

    fire() {
        this.anims.play('attackSkelly', true);
        var angle = Phaser.Math.Angle.Between(this.follower.vec.x, this.follower.vec.y, 1856/2, 896/2);
        this.scene.addEnemyBullet(this.follower.vec.x, this.follower.vec.y, angle, this.damageAmmount);

    }
 }
 
 export default SkellyEnemy;