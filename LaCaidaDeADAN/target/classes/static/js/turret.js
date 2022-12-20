class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'turret');

        this.nextTick = 0;
        this.bullets = this.scene.getBullets();
        this.cost = 20;
        this.energy = 10;
        this.side = undefined;
    }

    placeLeft(i, j, map){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        map[i][j] = 1;
    }

    placeRight(i, j, map) {
        this.y = i * 64 + 32;
        this.x = (j + 16) * 64 + 32;
        map[i][j] = 1;
    }

    getCost(){
        return this.cost;
    }
    
    getEnergy(){
        return this.energy;
    }

    setBullets(bullets){
        this.bullets = bullets;
    }

    setEnemies(enemies){
        this.enemies = enemies;
    }

    getSide(){
        return this.side;
    }

    setSide(side){
        this.side = side;
    }

    update(time, delta){
        if(time > this.nextTick){
            this.fire();
            this.nextTick = time + 1000;
        }
    }

    fire() {
        var enemy = this.scene.getEnemy(this.x, this.y, 300, this.getSide());

        if(enemy){
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            this.scene.addBullet(this.x, this.y, angle);
            this.scene.sound.play('shoot');
            this.angle = (angle, Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }
}

export default Turret;