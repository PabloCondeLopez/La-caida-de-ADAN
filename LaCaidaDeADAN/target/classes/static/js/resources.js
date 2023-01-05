let game;

class Resources extends Phaser.Scene {
    constructor(screenWidth, screenHeight, gameConfig) {
        super();

        Phaser.Scene.call(this, {key: 'Resources'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        game = gameConfig;
    }

    preload() {
        this.load.image('resources_background', 'assets/pantalla_recursos.png');
        this.load.image('button', 'assets/pantalla_recursos.png');
    }

    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'resources_background').setScale(0.95);

        this.continueButton = this.add.image(this.screenWidth / 2 + 730, this.screenHeight / 2 + 370, 'button').setScale(3.5);

        this.continueText = this.add.text(this.screenWidth / 2 + 735, this.screenHeight / 2 + 370, 'Menu', {fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.continueText.setInteractive();
        this.continueText.on('pointerdown', this.backToMenu);

        this.continueText.on("pointerover", () => {
            this.continueButton.setTint(0xDDDDDD);
            this.continueText.setTint(0xFFFFFF);
        })

        this.continueText.on("pointerout", () => {
            this.continueButton.clearTint();
            this.continueText.clearTint();
        })
    }

    backToMenu(){
        game.scene.stop('Resources');
        game.scene.start('MainMenu');
    }

}

export default Resources;