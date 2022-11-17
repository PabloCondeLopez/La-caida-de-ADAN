class Cell extends Phaser.GameObjects.Image {

    constructor (x, y) {
        this.posX = x;
        this.posY = Y;
        this.building;
        this.full = false;
        this.cellButton = game.add.button(game.world.centerX - 95, 400, 'button', buildManager.cellButton_onClick(this), this, 2, 1, 0);
        this.buildMenu = document.getElementById("buildMenu");
    }

    setBuilding(build){                         // colocar un edificio
        if(!full) {
            building = build;
            this.full = true;
        }
    }

    upgradeBuilding(){                          // mejorar el edificio
        if(full) {
            building.updgrade();
        }
    }

    destroyBuilding(){                          // destruir el edificio
        if(full) {
            building.destroy();
            this.full = false;
        }
    }


}



