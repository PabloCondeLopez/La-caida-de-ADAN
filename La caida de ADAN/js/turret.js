class Turret extends Phaser.GameObjects.Image {
    
    
    constructor (scene){
        var damage = this.damage;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    }

    place(i, j){
        this.y = i*step;
        this.x = j*step;
        map[i][j] = 1;
    }

    fire (){
        var enemy = getEnemy(this.x, this.y, attackRange)
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }
    update(time, delta)
    {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
    



}