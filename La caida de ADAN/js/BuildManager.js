class buildManager extends Phaser.GameObjects.Image {

    constructor () {
        this.cells;   
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'buildMenu');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'selectionMenu');
        
        this.buildButton = game.add.button(game.world.centerX - 95, 400, 'button', selectionButton_onClick, this, 2, 1, 0);
        this.turret1Button = game.add.button(game.world.centerX - 95, 400, 'button', turret1Button_onClick, this, 2, 1, 0);
        this.turret2Button = game.add.button(game.world.centerX - 95, 400, 'button',turret2Button_onClick, this, 2, 1, 0);
        this.turret3Button = game.add.button(game.world.centerX - 95, 400, 'button', turret3Button_onClick, this, 2, 1, 0);
    }

    
    selectionButton_onClick(){
        if(this.selectionMenu.visible) {
            this.selectionMenu.visible = false;
            this.buildButton.visible = false;
            this.turret1Button.visible = false;
            this.turret2Button.visible = false;
            this.turret3Button.visible = false;
        }{
            this.selectionMenu.visible = true;
            this.buildButton.visible = true;
            this.turret1Button.visible = true;
            this.turret2Button.visible = true;
            this.turret3Button.visible = true;
        }
    }

    turret1Button_onClick(posX, posY) //torreta tipo 1
    {
        var coords = [posX, posY];
        new Turret(scene, 30, 15, 15, player, coords);
    }

    turret2Button_onClick() //torreta tipo 2
    {
        // construir tipo de torre 2
    }

    turret3Button_onClick() //torreta tipo 3
    {
        // construir tipo de torre 3
    }

    buildButton_onClick(){
        if(this.selectionButton.hidden) this.selectionButton.hidden = false;
        else this.selectionButton.hidden = true;
    }
    
    upgradeButton_onClick(cellToUpgrade){
        cellToUpgrade.updgradeBuilding()
    }

    destroyButton_onClick(cellToUpgrade){
        cellToUpgrade.destroyBuilding()
    }
}



