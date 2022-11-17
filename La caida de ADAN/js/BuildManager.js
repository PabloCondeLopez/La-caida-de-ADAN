class BuildManager extends Phaser.GameObjects.Image {

    constructor () {
        this.buildings;   
        this.cellOpen;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'buildMenu');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'selectionMenu');
        
        this.buildButton = game.add.button(game.world.centerX - 95, 400, 'button', buildButton_onClick, this, 2, 1, 0);
        this.turret1Button = game.add.button(game.world.centerX - 95, 400, 'button', turret1Button_onClick, this, 2, 1, 0);
        this.turret2Button = game.add.button(game.world.centerX - 95, 400, 'button',turret2Button_onClick, this, 2, 1, 0);
        this.turret3Button = game.add.button(game.world.centerX - 95, 400, 'button', turret3Button_onClick, this, 2, 1, 0);

        this.upgradeButton = game.add.button(game.world.centerX - 95, 400, 'button', upgradeButton_onClick(this.upgradeButton.x, this.upgradeButton.y), this, 2, 1, 0);
    }

    
    buildButton_onClick(){                      // activa y desactiva el menu de seleccion de torretas
        if(this.selectionMenu.visible) {
            this.selectionMenu.visible = false;
            this.turret1Button.visible = false;
            this.turret2Button.visible = false;
            this.turret3Button.visible = false;
        }{
            this.selectionMenu.visible = true;
            this.turret1Button.visible = true;
            this.turret2Button.visible = true;
            this.turret3Button.visible = true;
        }
    }

    turret1Button_onClick(){                        // construir tipo de torre 1
        
    }

    turret2Button_onClick(){                        // construir tipo de torre 2
        
    }

    turret3Button_onClick(){                        // construir tipo de torre 3
        
    }

    upgradeButton_onClick(posX, posY){           // mejorar la torre 
        cellOpen.updgradeBuilding();
    }

    destroyButton_onClick(posX, posY){           // destruir la torre
        cellOpen.cellToUpgrade.destroyBuilding();
    }

    initializeBuildings(numCells){
        for(i=0; i<numCells; i++){
            buildings[i] = null;
        }
        
    }

    cellButton_onClick(cell){                       // on click se habre el menu
        if(this.buildMenu.hidden) {
            this.buildMenu.hidden = false;
            cellOpen = cell;
        }
        else this.buildMenu.hidden = true; 
        
    }

    
}



