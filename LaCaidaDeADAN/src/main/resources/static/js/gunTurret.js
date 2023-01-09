import Turret from "./turret.js";

class GunTurret extends Turret {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'turret');

        this.nextTick = 0;
        this.bullets = this.scene.getBullets();
        this.cost = 20;
        this.energy = 10;
        this.side = undefined;
        this.coord = undefined;
        this.type = "normal";
        this.damage = 50;
    }
}

export default GunTurret;