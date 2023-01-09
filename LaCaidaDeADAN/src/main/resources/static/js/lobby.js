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
		this.load.image('map1', 'assets/Nivel1.png');
		this.load.image('map2', 'assets/Nivel1.png');
		this.load.image('map3', 'assets/Nivel1.png');
		this.load.image('button', 'assets/boton_menu_principal.png');
		this.load.image('player1', 'assets/oficial-high_res.png');
		this.load.image('player2', 'assets/rosales-high_res.png');
		this.load.image('exit', 'assets/exit.png');
	}
	
	create() {
		self = this;
		if(activeScene==='InfiniteOnlineLevel1' || activeScene === 'OnlineLevel1') this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map1');
		else if (activeScene==='InfiniteOnlineLevel2' || activeScene === 'OnlineLevel2') this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map2');
		else if (activeScene==='InfiniteOnlineLevel3' || activeScene === 'OnlineLevel3') this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map3');
		
		let rect = new Phaser.Geom.Rectangle(100, 50, 1650, 810);

        let graphics = this.add.graphics({ fillStyle: { color: '#000'} } );
        graphics.alpha = 0.75;
        graphics.fillRectShape(rect);
        
        this.add.image(this.screenWidth / 2 - 550, this.screenHeight / 2 + 100, 'player1');
        this.add.image(this.screenWidth / 2 + 550, this.screenHeight / 2 + 100, 'player2');
		
		this.player1Text = this.add.text(this.screenWidth / 2 - 500, this.screenHeight / 2 - 300, 'Marta: ', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		this.player2Text = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 - 300, 'Javier: ', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.player1Connected = this.add.text(this.screenWidth / 2 - 500, this.screenHeight / 2 - 200, 'Desconectado.', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		this.player2Connected = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 - 200, 'Desconectado.', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.playersReadyText = this.add.text(this.screenWidth / 2, this.screenHeight - 100, 'Esperando al otro jugador...', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.playButton = this.add.image(this.screenWidth / 2, this.screenHeight - 180, 'button').setScale(2.5).setVisible(false).setActive(false);
		this.playButtonText = this.add.text(this.screenWidth / 2, this.screenHeight - 180, 'Comenzar', {fontSize: '22px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5).setVisible(false).setActive(false);
		this.playButtonText.on('pointerdown', this.onStartButton, this)
		
		this.exit = this.add.image(1800, 60, 'exit').setScale(0.3);
        this.exit.setInteractive();
        this.exit.on('pointerdown', this.disconnect, this);
		
		this.playButtonText.on("pointerover", () => {
            this.playButton.setTint(0xDDDDDD);
            this.playButtonText.setTint(0xFFFFFF);
        })
        
        this.playButtonText.on("pointerout", () => {
            this.playButton.clearTint();
            this.playButtonText.clearTint();
        })
        
        this.exit.on("pointerover", () => {
            this.exit.setTint(0x606060);
        })

        this.exit.on("pointerout", () => {
            this.exit.clearTint();
        })
				
		if(playerID === 1) {
			this.player1Text.setColor('#ffff00');
			this.player1Connected.setText('Conectado.').setColor('#00ff00');
		} else {
			this.player2Text.setColor('#ffff00');
			this.player2Connected.setText('Conectado.').setColor('#00ff00');
			this.player1Connected.setText('Conectado.').setColor('#00ff00');
			this.playersReadyText.setText('Esperando al host para comenzar.');
		}
		
		echoHandler.onmessage = function(message) {
			let msg = message.data;
			
			if(msg === "start"){
				self.scene.stop("Lobby");
				self.scene.start(activeScene);
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
		this.connectionCheck = false;
		this.playersReady = false;
		
		this.scene.stop("Lobby");
		this.scene.start(activeScene);
		echoHandler.send("start");
	}
	
	disconnect(){
		echoHandler.close();
		playerID = 0;
		this.connectionCheck = false;
        this.scene.stop('Lobby');
        this.scene.start('MainMenu');
    }
}

export default Lobby;