var self;

class OnlineSelector extends Phaser.Scene {
	constructor(screenWidth, screenHeight) {
		super();
		
		Phaser.Scene.call(this, {key: 'OnlineSelector'});
		
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.playerID = 0;
		this.selectLevel = false;
		this.levelSelected = '';
	}
	
	preload() {
		this.load.image('background', 'assets/menu_principal.png');
		this.load.image('button', 'assets/boton_menu_principal.png');

		this.load.audio('click', 'assets/click.wav');
	}
	
	create() {
		self = this;
		if(echoHandler.readyState === 3) echoHandler = new WebSocket('ws://localhost:8080/echo');
		this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');
		
		this.offlineButton = this.add.image(this.screenWidth / 2 + 620, this.screenHeight / 2 - 150, 'button').setScale(4);
        this.onlineButton = this.add.image(this.screenWidth / 2 + 620, this.screenHeight / 2 + 100, 'button').setScale(4);
        
        this.offlineText = this.add.text(this.screenWidth / 2 + 625, this.screenHeight / 2 - 150, 'Offline', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.offlineText.setInteractive();
		this.offlineText.on('pointerdown', this.onOfflineButton, this);

		this.onlineText = this.add.text(this.screenWidth / 2 + 625, this.screenHeight / 2 + 100, 'Online', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.onlineText.setInteractive();
        this.onlineText.on('pointerdown', this.onOnlineButton, this);
        
        this.backButton = this.add.image(220, this.screenHeight - 100, 'button').setScale(3.5);
        this.backText = this.add.text(225, this.screenHeight - 105, 'Volver', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.backText.setInteractive();
        this.backText.on('pointerdown', this.onBackButton, this);
        
        this.fullText = this.add.text(this.screenWidth - 150, this.screenHeight - 50, 'Sala llena.', {fontSize: '30px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setVisible(false);
		this.connectingText = this.add.text(this.screenWidth - 400, this.screenHeight - 50, 'Servidor desconectado, intentelo de nuevo.', {fontSize: '20px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setVisible(false);
		this.selectingLevelText = this.add.text(this.screenWidth - 450, this.screenHeight - 50, 'El host esta seleccionando nivel, intentelo de nuevo.', {fontSize: '20px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setVisible(false);
       
        this.onlineText.on("pointerover", () => {
            this.onlineButton.setTint(0xDDDDDD);
            this.onlineText.setTint(0xFFFFFF);
        })
        
        this.onlineText.on("pointerout", () => {
            this.onlineButton.clearTint();
            this.onlineText.clearTint();
        })
        
        this.offlineText.on("pointerover", () => {
            this.offlineButton.setTint(0xDDDDDD);
            this.offlineText.setTint(0xFFFFFF);
        })
        
        this.offlineText.on("pointerout", () => {
            this.offlineButton.clearTint();
            this.offlineText.clearTint();
        })
        
        this.backText.on("pointerover", () => {
			this.backButton.setTint(0xDDDDDD);
			this.backText.setTint(0xFFFFFF);
		})
		
		this.backText.on("pointerout", () => {
            this.backButton.clearTint();
            this.backText.clearTint();
        })
        
        echoHandler.onmessage = function(message) {
			if(message.data === 'selector') {
				echoHandler.send('registrar');
				self.selectLevel = true;
				return;
			} else if (message.data === 'wait') {
				self.selectingLevelText.setVisible(true);
				return;
			} 
			
			const msg = JSON.parse(message.data);
			
			if (msg.estado === 'lobby') {
				self.levelSelected = msg.level;
				self.selectLevel = false;
				echoHandler.send('registrar');
				return;
			}
			
			if(msg.estado === "registrado") {
				if(msg.jugador === 1){
					self.playerID = 1;
				} else if (msg.jugador === 2) {
					self.playerID = 2;
				}
			} 
			else if (msg.estado === "lleno") {
				self.fullText.setVisible(true);
			}
		}
	}
	
	onOnlineButton() {
		this.sound.play('click', {volume: 0.2});
		try {
			echoHandler.send('selector');
		} catch (e) {
			self.connectingText.setVisible(true);
		}
	}

	onOfflineButton(){
		this.sound.play('click', {volume: 0.2});
		this.game.scene.stop('OnlineSelector');
		this.game.scene.start('SelectLevel');
		online = false;
		activeScene = 'SelectLevel';
	}
	
	update(time, delta) {
		if(this.playerID === 0) return;
		
		playerID = this.playerID;
		online = true;
		
		if(playerID === 1 && this.selectLevel === true){
			this.scene.stop("OnlineSelector");
			this.scene.start("SelectLevel");
			activeScene = 'SelectLevel';
		} else if ((playerID === 1 || playerID === 2) && this.selectLevel === false) {
			this.scene.stop("OnlineSelector");
			this.scene.start("Lobby");
			activeScene = this.levelSelected;
		}
		
		this.playerID = 0;
	}
	
	onBackButton() {
		this.sound.play('click', {volume: 0.2});
		this.scene.stop('OnlineSelector');
		this.scene.start('MainMenu');
	}
}

export default OnlineSelector;