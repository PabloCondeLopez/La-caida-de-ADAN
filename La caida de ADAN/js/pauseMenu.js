class PauseMenu extends Phaser.Scene {
    constructor(gameWidth, gameHeigth){
        super();

        Phaser.Scene.call(this, {key: 'PauseMenu'} );

        this.gameWidth = gameWidth;
        this.gameHeigth = gameHeigth;
    }

    preload() {
        this.load.image('resumeButton', 'assets/menu_button_amarillo.png');
    }

    create() {
        let rect = new Phaser.Geom.Rectangle(this.gameWidth / 6, this.gameHeigth / 6, this.gameWidth / 1.5, this.gameHeigth / 1.5);

        let graphics = this.add.graphics({ fillStyle: { color: '#000'} } );
        graphics.alpha = 0.75;
        graphics.fillRectShape(rect);

        this.pauseText = this.add.text(this.gameWidth / 2, this.gameHeigth / 2 - 250, 'PAUSE', { fontSize: '60px', color: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 10).setOrigin(0.5, 0.5);

        //this.resumeButton = this.add.image(this.gameWidth / 2, this.gameHeigth / 2, 'resumeButton').setScale(7);
        //this.settingsButton = this.add.image(this.gameWidth / 2, this.gameHeigth / 2 - 200, 'resumeButton').setScale(7);
        //this.quitButton = this.add.image(this.gameWidth / 2, this.gameHeigth / 2 - 200, 'resumeButton').setScale(7);

        this.input.keyboard.on('keydown-Escape')
    }
}

export default PauseMenu;