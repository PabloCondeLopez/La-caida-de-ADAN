import InfiniteOnlineLevel1 from "./infiniteOnlineLevel1.js";
import MainMenu from "./mainMenu.js";
import Controls from "./controls.js";
import Resources from "./resources.js";
import PauseMenu from "./pauseMenu.js";
import ChatMenu from "./chatMenu.js";
import GameOver from "./gameOver.js";
import OnlineSelector from "./onlineSelector.js";
import Lobby from "./lobby.js";
import SelectLevel from "./selectLevel.js";
import LevelPath from "./levelPath.js";
import Level1 from "./level1.js";
import Victory from "./victory.js";

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

// - - - - - - - - SCENES - - - - - - - - - -
let mainMenu = new MainMenu(gameWidth, gameHeight);
let controls = new Controls(gameWidth, gameHeight);
let resources = new Resources(gameWidth, gameHeight);
let onlineSelector = new OnlineSelector(gameWidth, gameHeight);
let selectLevel = new SelectLevel(gameWidth, gameHeight);
let infiniteOnlineLevel1 = new InfiniteOnlineLevel1(gameWidth, gameHeight);
let level = new LevelPath(gameWidth, gameHeight, game);
let level1 = new Level1(gameWidth, gameHeight, game);
let pauseMenu = new PauseMenu(gameWidth, gameHeight);
let gameOver = new GameOver(gameWidth, gameHeight);
let chatMenu = new ChatMenu(gameWidth, gameHeight);
let lobby = new Lobby(gameWidth, gameHeight);
let victory = new Victory(gameWidth, gameHeight);

// - - - - - - - - - - - - - - - - - - - - - -

game.scene.add('MainMenu', mainMenu);
game.scene.add('Controls', controls);
game.scene.add('Resources', resources);
game.scene.add('SelectLevel', selectLevel);
game.scene.add('InfiniteOnlineLevel1', infiniteOnlineLevel1);
game.scene.add('Level', level);
game.scene.add('Level1', level1);
game.scene.add('Pause', pauseMenu);
game.scene.add('GameOver', gameOver);
game.scene.add('ChatMenu', chatMenu);
game.scene.add('OnlineSelector', onlineSelector);
game.scene.add('Lobby', lobby);
game.scene.add('Victory', victory);

// - - - - - - - - - - - - - - - - - - - - - - -

game.scene.start('MainMenu');