class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.dx = 0;
        this.dy = 0;
        this.lifeSpan = 0;
        this.damage = undefined;
        this.father=undefined;

        this.speed = Phaser.Math.GetSpeed(1200, 1);
    }

    fire(x, y, angle, damage, type) {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);
        if(type === 'laser'){
            this.setTint(0xff0000);
            this.setScale(1.5);
        }
        this.damage = damage;

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifeSpan = 3000;
    }
    
    getDamage(){
        return this.damage;
    }
    setFather(father){
        this.father = father;
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