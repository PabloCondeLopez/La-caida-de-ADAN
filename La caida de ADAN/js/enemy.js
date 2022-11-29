class Enemy extends Phaser.GameObjects.Image {

     constructor(scene){
         super(scene, 0, 0)
 
         Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
 
         this.follower = {
             t: 0,
             vec: new Phaser.Math.Vector2()
         };
 
         this.speed = 15/100000;
         this.maxHP = 100;
         this.currentHP = this.maxHP;
         this.damageAmmount = 100;
         this.moneyGiven = 10;
     }
 
     update (time, delta) {
        if(this.currentHP <= 0) this.die();
        
         this.follower.t += this.speed * delta;
 
         this.path.getPoint(this.follower.t, this.follower.vec);
 
         this.setPosition(this.follower.vec.x, this.follower.vec.y);
 
         if(this.follower.t >= 1){
             this.damagedPlayer.takeDamage(this.damageAmmount);
             this.destroy();
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