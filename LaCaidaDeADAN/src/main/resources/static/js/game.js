import OnlineLevel from "./onlineLevel.js";
import MainMenu from "./mainMenu.js";
import Controls from "./controls.js";
import Resources from "./resources.js";
import PauseMenu from "./pauseMenu.js";
import ChatMenu from "./chatMenu.js";
import GameOver from "./gameOver.js";
import OnlineSelector from "./onlineSelector.js";

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

let mainMenu = new MainMenu(gameWidth, gameHeight);
let controls = new Controls(gameWidth, gameHeight);
let resources = new Resources(gameWidth, gameHeight);
let level1 = new OnlineLevel(gameWidth, gameHeight, game);
let onlineSelector = new OnlineSelector(gameWidth, gameHeight);
let pauseMenu = new PauseMenu(gameWidth, gameHeight);
let gameOver = new GameOver(gameWidth, gameHeight);
let chatMenu = new ChatMenu(gameWidth, gameHeight);

game.scene.add('MainMenu', mainMenu);
game.scene.add('Controls', controls);
game.scene.add('Resources', resources);
game.scene.add('Level', level1);
game.scene.add('Pause', pauseMenu);
game.scene.add('GameOver', gameOver);
game.scene.add('ChatMenu', chatMenu);
game.scene.add('OnlineSelector', onlineSelector);
game.scene.start('MainMenu');