import LevelPath from "./levelPath.js";
import MainMenu from "./mainMenu.js";

const gameWidth = 1536;
const gameHeight = 1024;

//var player1 = new Player(1);
//var player2 = new Player(2);
//var buildManager = new BuildManager();

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    physics: {
        default: 'arcade'
    },
};


let game = new Phaser.Game(config);

let mainMenu = new MainMenu(gameWidth, gameHeight, game);
let level1 = new LevelPath(gameWidth, gameHeight);
game.scene.add('MainMenu', mainMenu);
game.scene.add('Level', level1);
game.scene.start('Level');