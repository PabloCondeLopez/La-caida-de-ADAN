import Turret from "./turret.js";

class GunTurret extends Turret {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'gunTurret');

        this.nextTick = 0;
        this.bullets = this.scene.getBullets();
        this.cost = 20;
        this.energy = 10;
        this.side = undefined;
        this.coord = undefined;
        this.type = "normal";
        this.damage = 50;
        this.attackSpeed = 1.5;
        this.range = 400;
    }
    
    playSound(){
        this.scene.sound.play('turretShoot', {volume: 0.2});
    }

    playBuildSound(){
        this.scene.sound.play('shootBuild', {volume: 0.2});
    }

    upgradeTurret(){
        if(this.level<this.maxLevel){
            this.scene.sound.play('upgrade');
            this.level++;
            this.setFrame(this.level);
            this.damage *=this.upgradeRate;
        }
    }
}

export default GunTurret;