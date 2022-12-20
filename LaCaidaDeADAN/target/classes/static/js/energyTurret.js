class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0);

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'energyTurret');

        this.cost = 20;
        this.energy = -40;
        this.side = undefined;
        this.coord = undefined;
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

    
}

export default Turret;