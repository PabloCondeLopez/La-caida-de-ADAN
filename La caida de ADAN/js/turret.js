class Turret extends Phaser.GameObjects.Image {
    
    
    constructor (scene, dmg, range, energy, player, cell){
        var enemy = null;
        var attackRange = range;
        var position = [cell.posX, cell.posY];
        var energyRequired = energy
        var owner = player;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    }

    fire (){
        
        if(this.enemyValid(this.enemy)) {
            var angle = Phaser.Math.Angle.Between(this.position[0], this.position[1], enemy.follower.vec.x, enemy.follower.vec.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            enemy.damage(this.damage);
        }
        else{
            enemy = getEnemy(enemyList);
        }
    }

    getEnemy(enemyList){
        var i = 0;
       while(!this.enemyValid(this.enemy)){
        if(this.enemyValid(enemyList[i])){
            enemy = enemyList[i];
        }
        i++;
       }
    }

    enemyValid(enemy){
        if(enemy.isAlive() && (Math.abs((enemy.follower.vec.y - this.position[0]) + (enemy.follower.vec.y - this.position[1])) <= this.attackRange)){
            return true;
        }
        else
        return false;
    }


    
    update(time, delta)
    {
        if(time > this.nextTic) {
            if(energyRequired<=energy)
                this.fire();

            this.nextTic = time + 1000;
        }
    }
}