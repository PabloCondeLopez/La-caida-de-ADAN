import Enemy from "./enemy.js";

class TurretEnemy extends Enemy{
    constructor(scene){
        super(scene, 0, 0);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'enemyWalkin');
        
        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };

        this.anims.create({
            key:'walking',
            frames: this.anims.generateFrameNumbers('enemyWalkin', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });

        

        this.speed = 8/100000;
        this.maxHP = 100;
        this.currentHP = this.maxHP;
        this.damageAmmount = 5;
        this.moneyGiven = 10;
        this.range = 350;
        this.ranged = true;
        this.attackSpeed = 7;
    }

    fire() {
            var angle = Phaser.Math.Angle.Between(this.follower.vec.x, this.follower.vec.y, 1856/2, 896/2);
            this.scene.addEnemyBullet(this.follower.vec.x, this.follower.vec.y, angle);
            this.scene.sound.play('shoot', {volume: 0.1});
            //this.angle = (angle, Math.PI/2) * Phaser.Math.RAD_TO_DEG;
    }

    update (time, delta) {
        this.anims.play('walking', true);
        if(this.currentHP <= 0) this.die();
        
         this.follower.t += this.speed * delta;
 
         this.path.getPoint(this.follower.t, this.follower.vec);
 
         this.setPosition(this.follower.vec.x, this.follower.vec.y);
 
         if(this.follower.t >= 1){
             this.damagedPlayer.takeDamage(this.damageAmmount);
             this.destroy();
         }
     }
 
     /*startOnPath(path, moneyPlayer, damagedPlayer) {
         this.follower.t = 0;
 
         path.getPoint(this.follower.t, this.follower.vec);
         this.setPosition(this.follower.vec.x, this.follower.vec.y);

         this.path = path;
         this.moneyPlayer = moneyPlayer;
         this.damagedPlayer = damagedPlayer;
     }
 
     getHP(){
         return this.currentHP;
     }

     setHP(hp){
        this.currentHP = hp;
     }
 
     takeDamage(damage, bullet){
        if(this.active && bullet.active === true){
            this.currentHP -= damage;

            
            if(this.currentHP <= 0)
                this.die()
        }
     }

     die(){
        this.moneyPlayer.addMoney(this.moneyGiven);
        this.destroy();
     }
     */
 }
 
 export default TurretEnemy;