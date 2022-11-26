import MainMenu from "./Scenes/MainMenu.js";
import LevelPath from "./levelPath.js";

const gameWidth = 640;
const gameHeight = 600;

//var player1 = new Player(1);
//var player2 = new Player(2);
//var buildManager = new BuildManager();

//let mainMenu = new MainMenu('MainMenu');
let level1 = new LevelPath();

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    scene: [ level1 ]

};

let game = new Phaser.Game(config);
//game.scene.add('MainMenu', mainMenu);
//game.scene.start('MainMenu');