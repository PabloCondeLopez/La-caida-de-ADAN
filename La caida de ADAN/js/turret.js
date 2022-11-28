class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');

        this.nextTick = 0;
        this.bullets = this.scene.getBullets();
        this.enemies = this.scene.getEnemies();
    }

    place(i, j, map){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        map[i][j] = 1;
    }

    setBullets(bullets){
        this.bullets = bullets;
    }

    setEnemies(enemies){
        this.enemies = enemies;
        console.log(this.enemies);
    }

    update(time, delta){
        if(time > this.nextTick){
            this.fire();
            this.nextTick = time + 1000;
        }
    }

    fire() {
        var enemy = this.scene.getEnemy(this.x, this.y, 100);

        if(enemy){
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            this.scene.addBullet(this.x, this.y, angle);
            this.angle = (angle, Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }
}

export default Turret;