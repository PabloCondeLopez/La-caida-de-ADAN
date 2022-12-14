
let quitGame = false;

class GameOver extends Phaser.Scene {
    constructor(gameWidth, gameHeight){
        super();

        Phaser.Scene.call(this, {key: 'GameOver'} );

        this.gameWidth = gameWidth;
        this.gameHeigth = gameHeight;
    }

    preload(){
        this.load.image('resumeButton', 'assets/menu_button_amarillo.png');
    }

    create(){
        let rect = new Phaser.Geom.Rectangle(0, 0, this.gameWidth, this.gameHeigth);

        let graphics = this.add.graphics({ fillStyle: { color: '#000'} } );
          graphics.alpha = 0.75;
          graphics.fillRectShape(rect);

        this.add.text(265, 350, 'HAS PERDIDO', { fontSize: '110px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 10);
        this.resumeButton = this.add.image(750, 700, 'resumeButton');
        this.quitText = this.add.text(760, 510 + 195, 'Salir', { fontSize: '30px', color: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 5).setOrigin(0.5, 0.5);
        this.quitText.setInteractive();
        this.quitText.on('pointerdown', this.goToMainMenu);
    }

    goToMainMenu(){
        quitGame=true;
    }

    update(){
        if(quitGame===true){
            quitGame = false;
            this.scene.stop('Level');
            this.scene.start('MainMenu');
        }
    }
}

export default GameOver;