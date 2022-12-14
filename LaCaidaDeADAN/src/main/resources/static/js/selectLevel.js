class SelectLevel extends Phaser.Scene {
    constructor(screenWidth, screenHeight) {
        super();

        Phaser.Scene.call(this, {key: 'SelectLevel'});

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    preload() {
        this.load.image('nivel', 'assets/Nivel_1.png');
        this.load.image('button', 'assets/boton_menu_principal.png');
        this.load.image('exit', 'assets/exit.png');

        this.load.audio('click', 'assets/click.wav');
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
        this.play1Text.on('pointerdown', this.startLevel1, this);

        this.play2Text = this.add.text(this.level2button.x, this.level1button.y-5, 'Sigue jugando para desbloquear', {fontSize: '26px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setWordWrapWidth(500).setOrigin(0.5, 0.5);
        this.play3Text = this.add.text(this.level3button.x, this.level1button.y-5, 'Sigue jugando para desbloquear', {fontSize: '26px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setWordWrapWidth(500).setOrigin(0.5, 0.5);
       
        this.exit = this.add.image(1800, 60, 'exit').setScale(0.3);
        this.exit.setInteractive();
        this.exit.on('pointerdown', this.exitLevels, this);

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
        this.play2Text.on('pointerdown', this.startLevel2, this);

        
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
        this.play2Text.setFontSize(40);
        this.level3.setTint(0x9A9A9A);
        this.level3button.setVisible(true);
        this.play3Text.setInteractive();
        this.play3Text.on('pointerdown', this.startLevel3, this);

        
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
        this.sound.play('click', {volume: 0.2});
        this.scene.stop('SelectLevel');
        let levelInfo;
       
        if(mode===false) {
            if(online===false){
                this.scene.start('Level1');
                activeScene = 'Level1';
            } else{
                this.scene.start('Lobby');
                activeScene = 'OnlineLevel1';
                
                levelInfo = {
					info: 'level',
					selected: 'OnlineLevel1'
				}
            }
        } else {
            if(online===false){
                this.scene.start('InfiniteLevel1');
                activeScene = 'InfiniteLevel1';
            } else{
                this.scene.start('Lobby');
                activeScene = 'InfiniteOnlineLevel1';
                
                levelInfo = {
					info: 'level',
					selected: 'InfiniteOnlineLevel1'
				}
            }
        }
        
        if(online === true) echoHandler.send(JSON.stringify(levelInfo));
    }    

    startLevel2(){
        this.sound.play('click', {volume: 0.2});
        this.scene.stop('SelectLevel');
        let levelInfo;
       
        if(mode===false) {
            if(online===false){
                this.scene.start('Level2');
                activeScene = 'Level2';
            } else{
                this.scene.start('Lobby');
                activeScene = 'OnlineLevel2';
                
                levelInfo = {
					info: 'level',
					selected: 'OnlineLevel2'
				}
            }
        } else {
            if(online===false){
                this.scene.start('InfiniteLevel2');
                activeScene = 'InfiniteLevel2';
            } else{
                this.scene.start('Lobby');
                activeScene = 'InfiniteOnlineLevel2';
                
                levelInfo = {
					info: 'level',
					selected: 'InfiniteOnlineLevel2'
				}
            }
        }
        
        if(online === true) echoHandler.send(JSON.stringify(levelInfo));
    }

    startLevel3(){
        this.sound.play('click', {volume: 0.2});
        this.scene.stop('SelectLevel');
        let levelInfo;
       
        if(mode===false) {
            if(online===false){
                this.scene.start('Level3');
                activeScene = 'Level3';
            } else{
                this.scene.start('Lobby');
                activeScene = 'OnlineLevel3';
                
                levelInfo = {
					info: 'level',
					selected: 'OnlineLevel3'
				}
            }
        } else {
            if(online===false){
                this.scene.start('InfiniteLevel3');
                activeScene = 'InfiniteLevel3';
            } else{
                this.scene.start('Lobby');
                activeScene = 'InfiniteOnlineLevel3';
                
                levelInfo = {
					info: 'level',
					selected: 'OnlineLevel2'
				}
            }
        }
        
        if(online === true) echoHandler.send(JSON.stringify(levelInfo));
    }

    exitLevels(){
        this.sound.play('click', {volume: 0.2});
		if(playerID != 0){
			echoHandler.close();
			playerID = 0;
		}
		
        this.scene.stop('SelectLevel');
        this.scene.start('MainMenu');
    }
    
}

export default SelectLevel;