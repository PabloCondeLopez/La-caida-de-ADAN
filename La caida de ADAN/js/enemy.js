class Enemy extends Phaser.GameObjects.Image {

     constructor(scene){
         super(scene, 0, 0)
 
         Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
 
         this.follower = {
             t: 0,
             vec: new Phaser.Math.Vector2()
         };
 
         this.speed = 1/10000;
         this.maxHP = 100;
         this.currentHP = this.maxHP;
     }
 
     update (time, delta) {
        if(this.currentHP <= 0) this.die();
        
         this.follower.t += this.speed * delta;
 
         this.path.getPoint(this.follower.t, this.follower.vec);
 
         this.setPosition(this.follower.vec.x, this.follower.vec.y);
 
         if(this.follower.t >= 1){
             this.setActive(false);
             this.setVisible(false);
         }
     }
 
     startOnPath(path) {
         this.follower.t = 0;
 
         path.getPoint(this.follower.t, this.follower.vec);
         this.setPosition(this.follower.vec.x, this.follower.vec.y);
 
         this.path = path;
     }
 
     getSpeed(){
         return this.speed;
     }
 
     getHP(){
         return this.currentHP;
     }
 
     setSpeed(newSpeed){
         this.speed = newSpeed;
     }
 
     takeDamage(bullet){
        if(this.active && bullet.active === true){
            bullet.setActive(false);
            bullet.setVisible(false);

            this.currentHP -= bullet.getDamageAmmount();
        }
     }

     die(){
        this.setActive(false);
        this.setVisible(false);
     }
 }
 
 export default Enemy;