class Turret extends Phaser.GameObjects.Image {
    
    
    constructor (scene, damage, attackRange){
        var damage = damage;
        var enemy = null;
        var attackRange = attackRange;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
        var energyRequired;
    }
    
    place(i, j){
        this.y = i*step;
        this.x = j*step;
        map[i][j] = 1;
    }

    fire (){
        
        if(enemy.isAlive() && (Math.abs(enemy.position - this.position) <= this.attackRange)) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            enemy.damage(this.damage);
            game.energy -= energyRequired;
        }
        else{
            enemy = getEnemy(enemyList);
        }
    }

    getEnemy(enemyList){
       for(let i=0; i<enemyList.length; i++){
        if(!this.enemyValid(this.enemy) && this.enemyValid(enemyList[i])){
            enemy = enemyList[i];
        }
       }
    }

    enemyValid(enemy){
        if(enemy.isAlive() && (Math.abs(enemy.position - this.position) <= this.attackRange)){
            return true;
        }
        else
        return false;
    }

    update(time, delta)
    {
        if(time > this.nextTic) {
            if(energyRequired<= energy) this.fire();
            this.nextTic = time + 1000;
        }
    }
    



}