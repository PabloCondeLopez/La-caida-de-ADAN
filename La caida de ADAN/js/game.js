import LevelPath from "./levelPath.js";
import MainMenu from "./mainMenu.js";
import PauseMenu from "./pauseMenu.js";
import BuyMenu from "./buyMenu.js";

const gameWidth = 1536;
const gameHeight = 1024;

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
let pauseMenu = new PauseMenu(gameWidth, gameHeight);

game.scene.add('MainMenu', mainMenu);
game.scene.add('Level', level1);
game.scene.add('Pause', pauseMenu);
game.scene.start('Level');