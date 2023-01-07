import LevelPath from "./levelPath.js";
import MainMenu from "./mainMenu.js";
import Controls from "./controls.js";
import Resources from "./resources.js";
import PauseMenu from "./pauseMenu.js";
import ChatMenu from "./chatMenu.js";
import GameOver from "./gameOver.js";
import SelectLevel from "./selectLevel.js";

const gameWidth = 1856;
const gameHeight = 896;

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
let controls = new Controls(gameWidth, gameHeight, game);
let resources = new Resources(gameWidth, gameHeight, game);
let selectLevel = new SelectLevel(gameWidth, gameHeight, game);
let level1 = new LevelPath(gameWidth, gameHeight, game);
let pauseMenu = new PauseMenu(gameWidth, gameHeight);
let gameOver = new GameOver(gameWidth, gameHeight);
let chatMenu = new ChatMenu(gameWidth, gameHeight);

game.scene.add('MainMenu', mainMenu);
game.scene.add('Controls', controls);
game.scene.add('Resources', resources);
game.scene.add('SelectLevel', selectLevel);
game.scene.add('Level', level1);
game.scene.add('Pause', pauseMenu);
game.scene.add('GameOver', gameOver);
game.scene.add('ChatMenu', chatMenu);
game.scene.start('MainMenu');