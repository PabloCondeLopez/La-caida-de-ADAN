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
        this.damage = 0.5;
        this.attackSpeed = 0.00001;
        this.range = 200;
        this.repeatRate = 8;
        this.countRepeat = 0;
    }

    playSound(){
        this.countRepeat++;
        if(this.countRepeat>=this.repeatRate){
        this.countRepeat = 0;
        this.scene.sound.play('laserShoot', {volume: 0.1}, );
        }
    }

    playBuildSound(){
        this.scene.sound.play('shootBuild', {volume: 0.2});
    }
    
}

export default LaserTurret;