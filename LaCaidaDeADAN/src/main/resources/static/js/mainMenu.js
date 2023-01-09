class MainMenu extends Phaser.Scene {
    constructor(screenWidth, screenHeight) {
        super();

        Phaser.Scene.call(this, {key: 'MainMenu'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    preload() {
        this.load.image('background', 'assets/mainMenuImage.png');
        this.load.image('button', 'assets/boton_menu_principal.png');
        this.load.image('question', 'assets/interrogation.png');

        this.load.audio('click', 'assets/click.wav');
    }

    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');

        this.historyButton = this.add.image(this.screenWidth / 2 + 600, this.screenHeight / 2 - 250, 'button').setScale(3.5);
        this.competitiveButton = this.add.image(this.screenWidth / 2 + 600, this.screenHeight / 2 - 50, 'button').setScale(3.5).setTint(0x808080);
        this.endlessButton = this.add.image(this.screenWidth / 2 + 600, this.screenHeight / 2 + 150, 'button').setScale(3.5);
        //this.controlsButton = this.add.image(this.screenWidth / 2 + 730, this.screenHeight / 2 + 370, 'button').setScale(3.5);
        this.chatButton = this.add.image(150, this.screenHeight - 50, 'button').setScale(2);

        this.historyText = this.add.text(this.screenWidth / 2 + 605, this.screenHeight / 2 - 255, 'Historia', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.historyText.setInteractive();
        this.historyText.on('pointerdown', this.selectLevelHistory, this);

        this.competitiveText = this.add.text(this.screenWidth / 2 + 602, this.screenHeight / 2 - 55, 'Competitivo', {fontSize: '29px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setTint(0x808080);

        this.endlessText = this.add.text(this.screenWidth / 2 + 605, this.screenHeight / 2 + 145, 'Infinito', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.endlessText.setInteractive();
        this.endlessText.on('pointerdown', this.startLevel, this);

        /*
        this.controlsText = this.add.text(this.screenWidth / 2 + 735, this.screenHeight / 2 + 370, 'Controles', {fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.controlsText.setInteractive();
        this.controlsText.on('pointerdown', this.openControls, this);
        */

        this.resourcesButton = this.add.image(this.screenWidth / 2 + 865, this.screenHeight / 2 - 390, 'question').setScale(0.6);
        this.resourcesButton.setInteractive();
        this.resourcesButton.on('pointerdown', this.openResources, this);

        this.chatText = this.add.text(150, this.screenHeight - 50, 'Chat', {fontSize: '25px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.chatText.setInteractive();
        this.chatText.on('pointerdown', this.chatScene, this);

        this.historyText.on("pointerover", () => {
            this.historyButton.setTint(0xDDDDDD);
            this.historyText.setTint(0xFFFFFF);
        })

        this.historyText.on("pointerout", () => {
            this.historyButton.clearTint();
            this.historyText.clearTint();
        })

        this.endlessText.on("pointerover", () => {
            this.endlessButton.setTint(0xDDDDDD);
            this.endlessText.setTint(0xFFFFFF);
        })

        this.endlessText.on("pointerout", () => {
            this.endlessButton.clearTint();
            this.endlessText.clearTint();
        })

        this.resourcesButton.on("pointerover", () => {
            this.resourcesButton.setTint(0xDDDDDD);
        })

        this.resourcesButton.on("pointerout", () => {
            this.resourcesButton.clearTint();
        })
        
        this.chatText.on("pointerover", () => {
            this.chatButton.setTint(0xDDDDDD);
            this.chatText.setTint(0xFFFFFF);
        })

        this.chatText.on("pointerout", () => {
            this.chatButton.clearTint();
            this.chatText.clearTint();
        })
    }

    startLevel(){
        this.sound.play('click', {volume: 1});
		this.game.scene.stop('MainMenu');
		this.game.scene.start('OnlineSelector');
        
        mode = true;
        activeScene = 'OnlineSelector';
    }

    selectLevelHistory(){
        this.sound.play('click', {volume: 1});
        this.game.scene.stop('MainMenu');
		this.game.scene.start('OnlineSelector');
        
        mode = false;
        activeScene = 'OnlineSelector';
    }

    chatScene() {
        this.sound.play('click', {volume: 1});
        this.scene.stop('MainMenu');
        this.scene.start('ChatMenu');
    }

    openResources(){
        this.sound.play('click', {volume: 1});
        this.scene.stop('MainMenu');
        this.scene.start('Resources');
    }
}

export default MainMenu;