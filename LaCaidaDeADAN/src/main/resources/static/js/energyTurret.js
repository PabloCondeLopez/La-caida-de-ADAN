class energyTurret extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'energyGen');

        this.cost = 20;
        this.energy = -40;
        this.side = undefined;
        this.coord = undefined;
        this.type = "energy";

        this.level = 0;
        this.maxLevel = 2;
        this.upgradeRate = 1.5;
        this.upgradeImage = undefined;

        
    }

    upgradeTurret(){
        if(this.level<this.maxLevel){
            this.scene.sound.play('upgrade');
            this.energy *= this.upgradeRate;
            this.level++;
            this.setFrame(this.level);
        }
    }

    playBuildSound(){
        this.scene.sound.play('buildEnergy', {volume: 0.2});
    }

    getUpgradeCost(){
        return 10;
        //return this.upgradeRate * this.cost * this.level; 
    }

    getMaxLevel(){
        return this.maxLevel;
    }
    
    getLevel(){
        return this.level;
    }

    getUpgradeEnergy(){
        return this.energy;
        //return this.upgradeRate * this.energy * this.level; 
    }

    setUpgradeImage(image) {
        this.upgradeImage = image;
    }

    placeLeft(i, j, map){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        map[i][j] = 1;
        this.coord = [i,j];
    }

    placeRight(i, j, map) {
        this.y = i * 64 + 32;
        this.x = (j + 16) * 64 + 32;
        map[i][j] = 1;
        this.coord = [i,j];
    }

    getCoord(){
        return this.coord;
    }
    getCoordX(){
        if(this.coord===undefined) return false;
        return this.coord[0];
    }
    getCoordY(){
        if(this.coord===undefined) return false;
        return this.coord[1];
    }

    getCost(){
        return this.cost;
    }
    
    getEnergy(){
        return this.energy;
    }

    getSide(){
        return this.side;
    }

    setSide(side){
        this.side = side;
    }

    getType() {
		return this.type;
	}
}

export default energyTurret;