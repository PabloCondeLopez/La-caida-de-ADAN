class Enemy extends Phaser.GameObjects.Image {

     constructor(scene){
         super(scene, 0, 0)
 
         Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
 
         this.follower = {
             t: 0,
             vec: new Phaser.Math.Vector2()
         };
 
         this.speed = undefined;
         this.maxHP = undefined;
         this.currentHP = this.maxHP;
         this.damageAmmount = undefined;
         this.moneyGiven = undefined;
         this.range = undefined;
         this.attackSpeed = undefined;
         this.nextAttack = 0;
     }
     
 
     update (time, delta) {
        if(this.currentHP <= 0) this.die();
        
         if(Phaser.Math.Distance.Between(this.follower.vec.x, this.follower.vec.y, 769, 548)>this.range){
            this.follower.t += this.speed * delta;
            this.path.getPoint(this.follower.t, this.follower.vec);
            this.setPosition(this.follower.vec.x, this.follower.vec.y);
         }
         
         else{
            if(time > this.nextAttack){
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
 }
 
 export default Enemy;