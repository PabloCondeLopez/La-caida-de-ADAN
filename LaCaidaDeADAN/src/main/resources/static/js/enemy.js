class Enemy extends Phaser.GameObjects.Sprite {

     constructor(scene){
         super(scene, 0, 0)
 
         Phaser.GameObjects.Image.call(this, scene, 0, 0, 'deadEnemy');
 
         this.follower = {
             t: 0,
             vec: new Phaser.Math.Vector2()
         };
 
         this.damageTimer = 100;
         this.deltaDamage = 0;
         this.speed = undefined;
         this.maxHP = undefined;
         this.currentHP = this.maxHP;
         this.damageAmmount = undefined;
         this.moneyGiven = undefined;
         this.range = undefined;
         this.attackSpeed = undefined;
         this.ranged = undefined;
         this.nextAttack = 0;
         this.scene = scene;
         this.hpBar = undefined;
         this.hpBar = this.scene.add.graphics();
         this.hpBar.fillStyle(255, 1);
         this.hpBar.fillRect(0, 0, 100, 10);
     }

     update (time, delta) {
        this.deltaDamage -= delta;
        if(this.deltaDamage<=0) this.clearTint();

        if(this.currentHP <= 0) this.die();
     
        this.hpBar.x = this.follower.vec.x - 50;
        this.hpBar.y = this.follower.vec.y - 50;

        
        if(Phaser.Math.Distance.Between(this.follower.vec.x, this.follower.vec.y, 1856/2, 896/2)>this.range){
            this.follower.t += this.speed * delta;
            this.path.getPoint(this.follower.t, this.follower.vec);
            this.setPosition(this.follower.vec.x, this.follower.vec.y);
         }
         
         else{
            if(time > this.nextAttack){
                /*if(this.ranged){
                    
                }*/
                this.fire();
                this.damagedPlayer.takeDamage(this.damageAmmount);
                this.nextAttack = time + this.attackSpeed*100;
            }
         }
     }
 
     startOnPath(path, moneyPlayer, damagedPlayer) {
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

     setMaxHP(hp){
        this.maxHP *= hp
        this.currentHP *= hp;
     }
 
     takeDamage(damage, bullet){
        if(this.active && bullet.active === true){
            this.hpBar.setScale(1 - (1 - (this.currentHP/this.maxHP)) - (damage/this.maxHP), 1);
            this.currentHP -= damage;
            this.setTint(0xff0000);
            this.deltaDamage = this.damageTimer;

            if(this.currentHP <= 0){
                this.die();
                this.hpBar.destroy();
            }
        }
     }

     die(){
        this.moneyPlayer.addMoney(this.moneyGiven);
        this.destroy();
     }
 }
 
 export default Enemy;