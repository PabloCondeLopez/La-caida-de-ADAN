let gamePaused = true;
let quitGame = false;

class PauseMenu extends Phaser.Scene {
    constructor(gameWidth, gameHeigth){
        super();

        Phaser.Scene.call(this, {key: 'PauseMenu'} );

        this.gameWidth = gameWidth;
        this.gameHeigth = gameHeigth;
    }

    preload() {
        this.load.image('resumeButton', 'assets/menu_button_amarillo.png');
        this.load.image('quitButton', 'assets/menu_button_azul.png');
    }

    create() {
        let rect = new Phaser.Geom.Rectangle(this.gameWidth / 6, this.gameHeigth / 6, this.gameWidth / 1.5, this.gameHeigth / 1.5);

        let graphics = this.add.graphics({ fillStyle: { color: '#000'} } );
        graphics.alpha = 0.75;
        graphics.fillRectShape(rect);

        this.pauseText = this.add.text(this.gameWidth / 2, this.gameHeigth / 2 - 250, 'PAUSE', { fontSize: '60px', color: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 10).setOrigin(0.5, 0.5);

        this.resumeButton = this.add.image(this.gameWidth / 2, this.gameHeigth / 2 - 70, 'resumeButton');
        this.resumeButton.setInteractive();
        this.resumeButton.on('pointerdown', this.onResumeGameHandler);

        this.quitButton = this.add.image(this.gameWidth / 2, this.gameHeigth / 2 + 200, 'quitButton');
        this.quitButton.setInteractive();
        this.quitButton.on('pointerdown', this.onQuitGameHandler);

        this.pauseText = this.add.text(this.gameWidth / 2, this.gameHeigth / 2 - 250, 'PAUSE', { fontSize: '60px', color: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 10).setOrigin(0.5, 0.5);

        this.resumeText = this.add.text(this.gameWidth / 2 + 30, this.gameHeigth / 2 - 75, 'Resume', { fontSize: '30px', color: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);
        this.quitText = this.add.text(this.gameWidth / 2 + 30, this.gameHeigth / 2 + 200, 'Quit', { fontSize: '30px', color: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown-ESC', this.onResumeGameHandler)
    }

    update() {
        if(quitGame) {
            quitGame = false;
            this.scene.stop('Level');
            this.scene.start('MainMenu');
        }

        if(!gamePaused) {
            gamePaused = true;
            this.scene.resume('Level');
            this.scene.sleep();
        }
    }

    onResumeGameHandler(event){
        gamePaused = false;
    }

    onQuitGameHandler(event) {
        quitGame = true;
    }
}

export default PauseMenu;