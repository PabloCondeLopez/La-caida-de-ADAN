class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.dx = 0;
        this.dy = 0;
        this.lifeSpan = 0;
        this.damage = 10;

        this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    shoot(x, y, angle) {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifeSpan = 300;
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