let self;

class Lobby extends Phaser.Scene {
	constructor(screenWidth, screenHeight) {
		super();
		
		Phaser.Scene.call(this, {key: 'Lobby'})
		
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.checkCooldown = 3000;
		this.checkDelta = 0;
	}
	
	create() {
		self = this;
		this.player1Text = this.add.text(this.screenWidth / 2 - 500, this.screenHeight / 2 - 300, 'Jugador 1: ', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		this.player2Text = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 - 300, 'Jugador 2: ', {fontSize: '40px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		this.player1Connected = this.add.text(this.screenWidth / 2 - 500, this.screenHeight / 2 - 200, 'Desconectado ', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		this.player2Connected = this.add.text(this.screenWidth / 2 + 500, this.screenHeight / 2 - 200, 'Desconectado ', {fontSize: '40px', fill: '#ff0000', fontFamily: 'Pixeled'}).setStroke("#000", 4).setOrigin(0.5, 0.5);
		
		if(playerID === 1) {
			this.player1Connected.setText('Conectado').setColor('#00ff00');
		} else {
			this.player2Connected.setText('Conectado').setColor('#00ff00');
			this.player1Connected.setText('Conectado').setColor('#00ff00');
		}
		
		echoHandler.onmessage = function(message) {
			let msg = message.data;
			console.log(msg);
			
			if(msg === "p2Connected") self.player2Connected.setText('Conectado').setColor('#00ff00');
			else if (msg === "p2Disconnected") self.player2Connected.setText('Desconectado').setColor('#ff0000');
			else if (msg === "p1Connected") self.player1Connected.setText('Conectado').setColor('#00ff00');
			else if (msg === "p1Disconnected") self.player1Connected.setText('Desconectado').setColor('#ff0000');
		}
	}
	
	update(time, delta) {
		if(this.checkDelta <= 0){
			echoHandler.send("check");
			this.checkDelta = this.checkCooldown;
		}
		
		this.checkDelta -= delta;
	}
}

export default Lobby;