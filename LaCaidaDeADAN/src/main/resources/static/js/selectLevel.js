let game;

class SelectLevel extends Phaser.Scene {
    constructor(screenWidth, screenHeight, gameConfig) {
        super();

        Phaser.Scene.call(this, {key: 'SelectLevel'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        game = gameConfig;
    }

    preload() {
        this.load.image('nivel', 'assets/Nivel_1.png');
        this.load.image('button', 'assets/boton_menu_principal.png');
        this.load.image('exit', 'assets/exit.png');
    }

    create() {
        this.level1 = this.add.image(362.8, 448, 'nivel').setScale(1).setTint(0x9A9A9A);
        this.level2 = this.add.image(927, 448, 'nivel').setScale(1).setTint(0x303030);
        this.level3 = this.add.image(1493.2, 448, 'nivel').setScale(1).setTint(0x303030);

        this.level1button = this.add.image(this.level1.x, 700, 'button').setScale(3.5);
        this.level2button = this.add.image(this.level2.x, 700, 'button').setScale(3.5).setVisible(false);
        this.level3button = this.add.image(this.level3.x, 700, 'button').setScale(3.5).setVisible(false);
        
        this.level1Text = this.add.text(this.level1.x, 251.2, 'Nivel 1', {fontSize: '70px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.level2Text = this.add.text(this.level2.x, 251.2, 'Nivel 2', {fontSize: '70px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.level3Text = this.add.text(this.level3.x, 251.2, 'Nivel 3', {fontSize: '70px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);

        this.play1Text = this.add.text(this.level1button.x, this.level1button.y-5, 'Jugar', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.play1Text.setInteractive();
        this.play1Text.on('pointerdown', this.startLevel1);

        this.play2Text = this.add.text(this.level2button.x, this.level1button.y-5, 'Sigue jugando para desbloquear', {fontSize: '26px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setWordWrapWidth(500).setOrigin(0.5, 0.5);
        this.play3Text = this.add.text(this.level3button.x, this.level1button.y-5, 'Sigue jugando para desbloquear', {fontSize: '26px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setWordWrapWidth(500).setOrigin(0.5, 0.5);
       
        this.exit = this.add.image(1800, 60, 'exit').setScale(0.3);
        this.exit.setInteractive();
        this.exit.on('pointerdown', this.exitLevels);

        this.exit.on("pointerover", () => {
            this.exit.setTint(0x606060);
        })

        this.exit.on("pointerout", () => {
            this.exit.clearTint();
        })

        
        this.play1Text.on("pointerover", () => {
            this.level1button.setTint(0x606060);
            this.play1Text.setTint(0x606060);
        })

        this.play1Text.on("pointerout", () => {
            this.level1button.clearTint();
            this.play1Text.clearTint();
        })
        
        
        if(levelsActive[1]===true){
            console.log('nivel 2');
            this.setLevel2Active();
        } 
        if(levelsActive[2]===true){
            this.setLevel3Active();
        } 
        

    }

    setLevel2Active(){
        this.play2Text.text = 'Jugar'; 
        this.play2Text.setFontSize(40);
        this.level2.setTint(0x9A9A9A);
        this.level2button.setVisible(true);
        this.play2Text.setInteractive();
        this.play2Text.on('pointerdown', this.startLevel1);

        
        this.play2Text.on("pointerover", () => {
            this.level2button.setTint(0x606060);
            this.play2Text.setTint(0x606060);
        })

        this.play2Text.on("pointerout", () => {
            this.level2button.clearTint();
            this.play2Text.clearTint();
        })
        
    }

    setLevel3Active(){
        this.play3Text.text = 'Jugar';
        this.level3.setTint(0x9A9A9A);
        this.level3button.setVisible(true);
        this.play3Text.setInteractive(true);
        this.play3Text.on('pointerdown', this.startLevel1);

        
        this.play3Text.on("pointerover", () => {
            this.level3button.setTint(0x606060);
            this.play3Text.setTint(0x606060);
        })

        this.play3Text.on("pointerout", () => {
            this.level3button.clearTint();
            this.play3Text.clearTint();
        })
        
    }
    
    startLevel1(){
        game.scene.stop('SelectLevel');
        game.scene.start('Level');
    }    

    exitLevels(){
        game.scene.stop('SelectLevel');
        game.scene.start('MainMenu');
    }
    
}

export default SelectLevel;