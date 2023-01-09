class Resources extends Phaser.Scene {
    constructor(screenWidth, screenHeight) {
        super();

        Phaser.Scene.call(this, {key: 'Resources'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.currentlyVisible = 0;
        this.tutorial = new Array(5);
    }

    preload() {
        this.load.image('construccion1', 'assets/Tutorial_c1.png');
        this.load.image('construccion2', 'assets/Tutorial_c2.png');
        this.load.image('controlesLocal', 'assets/Tutorial_cL.png');
        this.load.image('constrolesOnline', 'assets/Tutorial_cO.png');
        this.load.image('recursos', 'assets/Tutorial_r.png');
        this.load.image('button', 'assets/boton_menu_principal.png');
        this.load.image('arrow', 'assets/flecha.png');

        this.load.audio('click', 'assets/click.wav');
    }

    create() {
        this.tutorial[0] = this.add.image(this.screenWidth / 2, this.screenHeight / 2 - 70, 'construccion1').setScale(0.8);
        this.tutorial[1] = this.add.image(this.screenWidth / 2, this.screenHeight / 2 - 70, 'construccion2').setScale(0.8).setVisible(false);
        this.tutorial[2] = this.add.image(this.screenWidth / 2, this.screenHeight / 2 - 70, 'controlesLocal').setScale(0.8).setVisible(false);
        this.tutorial[3] = this.add.image(this.screenWidth / 2, this.screenHeight / 2 - 70, 'constrolesOnline').setScale(0.8).setVisible(false);
        this.tutorial[4] = this.add.image(this.screenWidth / 2, this.screenHeight / 2 - 70, 'recursos').setScale(0.8).setVisible(false);

        this.arrowR = this.add.image(this.screenWidth - 105, 65, 'arrow').setScale(0.35);
        this.arrowR.setInteractive();
        this.arrowR.on('pointerdown', this.nextScreen, this);
        this.arrowL = this.add.image(105, 65, 'arrow').setScale(0.35).setFlipX(true);
        this.arrowL.setInteractive();
        this.arrowL.on('pointerdown', this.previousScreen, this);

        this.continueButton = this.add.image(this.screenWidth / 2 + 730, this.screenHeight / 2 + 370, 'button').setScale(3);

        this.continueText = this.add.text(this.screenWidth / 2 + 735, this.screenHeight / 2 + 370, 'Menu', {fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.continueText.setInteractive();
        this.continueText.on('pointerdown', this.backToMenu, this);

        this.arrowR.on("pointerover", () => {
            this.arrowR.setTint(0xDDDDDD);
        })

        this.arrowR.on("pointerout", () => {
            this.arrowR.clearTint();
        })

        this.arrowL.on("pointerover", () => {
            this.arrowL.setTint(0xDDDDDD);
        })

        this.arrowL.on("pointerout", () => {
            this.arrowL.clearTint();
        })

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
        this.scene.stop('Resources');
        this.scene.start('MainMenu');
    }

    nextScreen(){
        this.tutorial[this.currentlyVisible].setVisible(false);

        if(this.currentlyVisible===4){
            this.currentlyVisible = 0;
        } else {
            this.currentlyVisible++;
        }
        this.tutorial[this.currentlyVisible].setVisible(true);
    }

    previousScreen(){
        this.tutorial[this.currentlyVisible].setVisible(false);

        if(this.currentlyVisible===0){
            this.currentlyVisible = 4;
        } else {
            this.currentlyVisible--;
        }
        this.tutorial[this.currentlyVisible].setVisible(true);
    }

}

export default Resources;