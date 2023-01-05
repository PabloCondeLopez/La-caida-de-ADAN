let fullText;

class OnlineSelector extends Phaser.Scene {
	constructor(screenWidth, screenHeight) {
		super();
		
		Phaser.Scene.call(this, {key: 'OnlineSelector'});
		
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
	}
	
	preload() {
		this.load.image('background', 'assets/menu_principal.png');
		this.load.image('button', 'assets/boton_menu_principal.png');
	}
	
	create() {
		this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');
		
		this.offlineButton = this.add.image(this.screenWidth / 2 + 500, this.screenHeight / 2 - 150, 'button').setScale(4).setTint(0x808080);
        this.onlineButton = this.add.image(this.screenWidth / 2 + 500, this.screenHeight / 2 + 100, 'button').setScale(4);
        
        this.offlineText = this.add.text(this.screenWidth / 2 + 505, this.screenHeight / 2 - 150, 'Offline', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setTint(0x808080);
        this.onlineText = this.add.text(this.screenWidth / 2 + 505, this.screenHeight / 2 + 100, 'Online', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.onlineText.setInteractive();
        this.onlineText.on('pointerdown', this.onOnlineButton, this);
        
        this.backButton = this.add.image(220, this.screenHeight - 100, 'button').setScale(3.5);
        this.backText = this.add.text(225, this.screenHeight - 105, 'Volver', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
        this.backText.setInteractive();
        this.backText.on('pointerdown', this.onBackButton, this);
        
        fullText = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 + 300, 'Sala llena', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setVisible(false);
        
        this.onlineText.on("pointerover", () => {
            this.onlineButton.setTint(0xDDDDDD);
            this.onlineText.setTint(0xFFFFFF);
        })
        
        this.onlineText.on("pointerout", () => {
            this.onlineButton.clearTint();
            this.onlineText.clearTint();
        })
        
        this.backText.on("pointerover", () => {
			this.backButton.setTint(0xDDDDDD);
			this.backText.setTint(0xFFFFFF);
		})
	}
	
	onOnlineButton() {
		echoHandler.send("registrar");
		
		echoHandler.onmessage = this.connectPlayer;
	}
	
	onBackButton() {
		fullText.setVisible(false);
		
		this.scene.stop('OnlineSelector');
		this.scene.start('MainMenu');
	}
	
	connectPlayer(message) {
		const msg = JSON.parse(message.data);
			
		if(msg.estado === "registrado") {
			if(msg.jugador === 1)
				playerID = 1;
			else if (msg.jugador === 2)
				playerID = 2;
		} 
		else if (msg.estado === "lleno") {
			fullText.setVisible(true);
			console.log("Sala llena - TODO - Mensaje por pantalla");
		}
	}
}

export default OnlineSelector;