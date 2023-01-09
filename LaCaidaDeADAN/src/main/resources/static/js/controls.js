class Controls extends Phaser.Scene {
    constructor(screenWidth, screenHeight) {
        super();

        Phaser.Scene.call(this, {key: 'Controls'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    preload() {
        this.load.image('controls_background', 'assets/pantalla_controles.png');
        this.load.image('button', 'assets/pantalla_controles.png');

        this.load.audio('click', 'assets/click.wav');
    }

    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'controls_background').setScale(0.95);

        this.continueButton = this.add.image(this.screenWidth / 2 + 730, this.screenHeight / 2 + 370, 'button').setScale(3.5);

        this.continueText = this.add.text(this.screenWidth / 2 + 735, this.screenHeight / 2 + 370, 'Menu', {fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.continueText.setInteractive();
        this.continueText.on('pointerdown', this.backToMenu, this);

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
        this.sound.play('click', {volume: 1});
        this.scene.stop('Controls');
        this.scene.start('MainMenu');
    }

}

export default Controls;