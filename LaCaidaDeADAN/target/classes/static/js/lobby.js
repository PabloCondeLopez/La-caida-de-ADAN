class Lobby extends Phaser.Scene {
	constructor(screenWidth, screenHeight, game) {
		super();
		
		Phaser.Scene.call(this, {key: 'lobby'})
		
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.game = game;
	}
	
	create() {
		
	}
}

export default Lobby;