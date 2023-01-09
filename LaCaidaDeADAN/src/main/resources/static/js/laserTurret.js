import Turret from "./turret.js";

class LaserTurret extends Turret {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'laser');

        this.nextTick = 0;
        this.bullets = this.scene.getBullets();
        this.cost = 30;
        this.energy = 15;
        this.side = undefined;
        this.coord = undefined;
        this.type = "laser";
        this.damage = 5;
        this.attackSpeed = 0.1;
        this.range = 200;
    }

    playSound(){}
    
}

export default LaserTurret;