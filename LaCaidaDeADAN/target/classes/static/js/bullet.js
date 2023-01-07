class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.dx = 0;
        this.dy = 0;
        this.lifeSpan = 0;
        this.damage = 0; // To change

        this.speed = Phaser.Math.GetSpeed(1200, 1);
    }

    fire(x, y, angle) {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifeSpan = 3000;
    }

    getDamage(){
        return this.damage;
    }

    update(time, delta){
        this.lifeSpan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifeSpan <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default Bullet;