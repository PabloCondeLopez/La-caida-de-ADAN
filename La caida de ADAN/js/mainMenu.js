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
        this.load.image('background', 'assets/Fondo_placeholder.png');
        this.load.image('button', 'assets/boton_menu_principal.png');
        this.load.image('logo', 'assets/logo.png');
    }

    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');

        this.add.image(150, 150, 'logo').setScale(0.3);

        this.historyButton = this.add.image(this.screenWidth / 2, this.screenHeight / 2 + 105, 'button').setScale(3.5);
        this.competitiveButton = this.add.image(this.screenWidth / 2, this.screenHeight / 2 + 250, 'button').setScale(3.5);
        this.endlessButton = this.add.image(this.screenWidth / 2, this.screenHeight / 2 + 400, 'button').setScale(3.5);

        this.historyText = this.add.text(this.screenWidth / 2 + 5, this.screenHeight / 2 + 100, 'Historia', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.historyText.setInteractive();
        this.historyText.on('pointerdown', this.startLevel);

        this.competitiveText = this.add.text(this.screenWidth / 2 + 2, this.screenHeight / 2 + 245, 'Competitivo', {fontSize: '29px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.endlessText = this.add.text(this.screenWidth / 2 + 5, this.screenHeight / 2 + 395, 'Infinito', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
    }

    startLevel(){
        game.scene.start('Level')
    }
}

export default MainMenu;