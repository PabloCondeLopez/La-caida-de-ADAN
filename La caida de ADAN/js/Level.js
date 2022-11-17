class Level extends Phaser.GameObjects.Image {

    constructor (x, y) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'firstMap');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'interface');

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'skill1');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'skill1');

        this.posX = x;
        this.posY = Y;
        this.building;
        this.full = false;
        this.buildMenu = document.getElementById("cellButton");
        this.buildMenu = document.getElementById("buildMenu");
    }

}