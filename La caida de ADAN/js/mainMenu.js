let game;

class MainMenu extends Phaser.Scene {
    constructor(screenWidth, screenHeight, gameConfig) {
        super();

        Phaser.Scene.call(this, {key: 'MainMenu'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        game = gameConfig;
    }

    preload() {
        this.load.image('background', 'assets/menu_principal.png');
        this.load.image('button', 'assets/boton_menu_principal.png');
    }

    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');

        this.historyButton = this.add.image(this.screenWidth / 2 + 450, this.screenHeight / 2 - 250, 'button').setScale(3.5);
        this.competitiveButton = this.add.image(this.screenWidth / 2 + 450, this.screenHeight / 2 - 50, 'button').setScale(3.5);
        this.endlessButton = this.add.image(this.screenWidth / 2 + 450, this.screenHeight / 2 + 150, 'button').setScale(3.5);

        this.historyText = this.add.text(this.screenWidth / 2 + 455, this.screenHeight / 2 - 255, 'Historia', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.competitiveText = this.add.text(this.screenWidth / 2 + 452, this.screenHeight / 2 - 55, 'Competitivo', {fontSize: '29px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);

        this.endlessText = this.add.text(this.screenWidth / 2 + 455, this.screenHeight / 2 + 145, 'Infinito', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.endlessText.setInteractive();
        this.endlessText.on('pointerdown', this.startLevel);
    }

    startLevel(){
        game.scene.stop('MainMenu');
        game.scene.start('Level');
    }
}

export default MainMenu;