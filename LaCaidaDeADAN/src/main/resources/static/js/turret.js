class Turret extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0);

        //Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'turret');

        this.nextTick = 0;
        this.bullets = this.scene.getBullets();
        this.cost = 20;
        this.energy = 10;
        this.side = undefined;
        this.coord = undefined;
        this.type = "normal";
        this.damage = undefined;
        
        this.level = 0;
        this.maxLevel = 2;
        this.upgradeRate = 1.5;
        this.upgradeImage = undefined;
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

    upgradeTurret(){
        if(this.level<this.maxLevel){
            this.level++;
            this.damage *=this.upgradeRate;
        }
    }

    getUpgradeCost(){
        return 10;
        //return this.upgradeRate * this.cost * this.level; 
    }

    getUpgradeEnergy(){
        return 0;
        //return this.upgradeRate * this.energy * this.level; 
    }

    getLevel(){
        return this.level;
    }

    getMaxLevel(){
        return this.maxLevel;
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
    
    getType() {
		return this.type;
	}

    setUpgradeImage(image) {
        this.upgradeImage = image;
    }

    getDamage(){
        return this.damage;
    }

    update(time, delta){
        if(time > this.nextTick){
            this.fire();
            this.nextTick = time + this.attackSpeed*1000;
        }
    }

    fire() {
        var enemy = this.scene.getEnemy(this.x, this.y, this.range, this.getSide());

        if(enemy){
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            this.scene.addBullet(this.x, this.y, angle, this.damage, this.type);            
            this.playSound();
            this.angle = (angle, Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }
}

export default Turret;