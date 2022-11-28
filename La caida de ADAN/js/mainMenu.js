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
    }

    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');

        this.historyButton = this.add.image(this.screenWidth / 2, this.screenHeight / 2 + 105, 'button').setScale(3.5);
        this.competitiveButton = this.add.image(this.screenWidth / 2, this.screenHeight / 2 + 250, 'button').setScale(3.5);
        this.endlessButton = this.add.image(this.screenWidth / 2, this.screenHeight / 2 + 400, 'button').setScale(3.5);

        this.historyText = this.add.text(this.screenWidth / 2, this.screenHeight / 2 + 110, 'History', {fontSize: '65px', fill: '#fff'}).setStroke("#000", 4);
        this.historyText.setOrigin(0.5, 0.5);
        this.historyText.setInteractive();

        this.historyText.on('pointerdown', this.startLevel);

        this.competitiveText = this.add.text(this.screenWidth / 2, this.screenHeight / 2 + 255, 'Competitive', {fontSize: '45px', fill: '#fff'}).setStroke("#000", 4);
        this.competitiveText.setOrigin(0.5, 0.5);
        this.competitiveText.setInteractive();

        this.endlessText = this.add.text(this.screenWidth / 2, this.screenHeight / 2 + 405, 'Endless', {fontSize: '65px', fill: '#fff'}).setStroke('#000', 4);
        this.endlessText.setOrigin(0.5, 0.5);
        this.endlessText.setInteractive();
    }

    startLevel(){
        game.scene.start('Level')
        game.scene.stop('MainMenu')
    }
}

export default MainMenu;