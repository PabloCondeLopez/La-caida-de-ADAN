class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');

        this.nextTick = 0;
        this.bullets = undefined;
    }

    place(i, j, map){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        map[i][j] = 1;
    }

    setBullets(bullets){
        this.bullets = bullets;
    }

    update(time, delta){
        if(time > this.nextTick){
            this.fire();
            this.nextTick = time + 1000;
        }
    }

    fire() {
        var enemy = getEnemy(this.x, this.y, 100);

        if(enemy){
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle, Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }

    addBullet(x, y, angle){
        let bullet = this.bullets.get();
        if(bullet){
            bullet.fire(x, y, angle);
        }
    }
}

function getEnemy(x, y, distance) {
    var enemyUnits = this.enemies.getChildren();

    for(var i = 0; i < enemyUnits.length; i++){
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
            return enemyUnits[i];
    }

    return false;
}

export default Turret;