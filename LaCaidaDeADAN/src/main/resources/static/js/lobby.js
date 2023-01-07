let self;

class Lobby extends Phaser.Scene {
	constructor(screenWidth, screenHeight) {
		super();
		
		Phaser.Scene.call(this, {key: 'Lobby'})
		
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.playersReady = false;
		this.connectionCheck = false;
	}
	
	preload() {
		this.load.image('map', 'assets/Nivel1_map.png');
		this.load.image('button', 'assets/boton_menu_principal.png');
	}
	
	create() {
		self = this;
		this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map').setScale(0.2);
		
		let rect = new Phaser.Geom.Rectangle(75, 50, 1700, 810);

        let graphics = this.add.graphics({ fillStyle: { color: '#000'} } );
        graphics.alpha = 0.75;
        graphics.fillRectShape(rect);
		
		this.player1Text = this.add.text(this.screenWidth / 2 - 500, this.screenHeight / 2 - 300, 'Jugador 1: ', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		this.player2Text = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 - 300, 'Jugador 2: ', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.player1Connected = this.add.text(this.screenWidth / 2 - 500, this.screenHeight / 2 - 200, 'Desconectado.', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		this.player2Connected = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 - 200, 'Desconectado.', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.playersReadyText = this.add.text(this.screenWidth / 2, this.screenHeight - 100, 'Esperando al otro jugador...', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.playButton = this.add.image(this.screenWidth / 2, this.screenHeight - 180, 'button').setScale(2.5).setVisible(false).setActive(false);
		this.playButtonText = this.add.text(this.screenWidth / 2, this.screenHeight - 180, 'Comenzar', {fontSize: '22px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setVisible(false).setActive(false);
		this.playButtonText.on('pointerdown', this.onStartButton, this)
		
		this.playButtonText.on("pointerover", () => {
            this.playButton.setTint(0xDDDDDD);
            this.playButtonText.setTint(0xFFFFFF);
        })
        
        this.playButtonText.on("pointerout", () => {
            this.playButton.clearTint();
            this.playButtonText.clearTint();
        })
				
		if(playerID === 1) {
			this.player1Connected.setText('Conectado.').setColor('#00ff00');
		} else {
			this.player2Connected.setText('Conectado.').setColor('#00ff00');
			this.player1Connected.setText('Conectado.').setColor('#00ff00');
			this.playersReadyText.setText('Esperando al host para comenzar.');
		}
		
		echoHandler.onmessage = function(message) {
			let msg = message.data;
			console.log(msg);
			
			if(msg === "start"){
				self.scene.stop("Lobby");
				self.scene.start("Level");
				return;
			}
			
			if (msg === "ready") self.playersReady = true;
			
			if(msg === "p2Connected") self.player2Connected.setText('Conectado.').setColor('#00ff00');
			else if (msg === "p2Disconnected") {
				self.player2Connected.setText('Desconectado.').setColor('#ff0000');
				self.playersReady = false;
			}
			else if (msg === "p1Connected") self.player1Connected.setText('Conectado.').setColor('#00ff00');
			else if (msg === "p1Disconnected"){
				self.player1Connected.setText('Desconectado.').setColor('#ff0000');
				self.playersReady = false;
			}
		}
	}
	
	update(time, delta) {
		if(this.connectionCheck === false) {
			echoHandler.send("check");
			this.connectionCheck = true;
		}
		
		this.updateStartButton();
	}
	
	updateStartButton() {
		if(this.playersReady === true && playerID === 1) {
			this.playersReadyText.setText('Presione el boton para iniciar la partida');
			this.playButton.setVisible(true).setActive(true);
			this.playButtonText.setVisible(true).setActive(true).setInteractive();
		} else if (this.playersReady === true && playerID === 2) {
			this.playersReadyText.setText('Esperando al host para comenzar.');
		} 
		else {
			this.playersReadyText.setText('Esperando al otro jugador...');
			this.playButton.setVisible(false).setActive(false);
			this.playButtonText.setVisible(false).setActive(false);
		}
	}
	
	onStartButton() {
		self.scene.stop("Lobby");
		self.scene.start("Level");
		echoHandler.send("start");
	}
}

export default Lobby;