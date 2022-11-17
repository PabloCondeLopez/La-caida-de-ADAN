class EnergyTurret extends Turret{

    constructor (scene, dmg, range, energy, player, cell){
        var enemy = null;
        var attackRange = range;
        var position = [cell.posX, cell.posY];
        var energyRequired = energy
        var owner = player;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    }
}