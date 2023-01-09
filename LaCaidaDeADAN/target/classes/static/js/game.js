import InfiniteOnlineLevel1 from "./infiniteOnlineLevel1.js";
import InfiniteOnlineLevel2 from "./infiniteOnlineLevel2.js";
import InfiniteOnlineLevel3 from "./infiniteOnlineLevel3.js";
import OnlineLevel1 from "./onlineLevel1.js";
import OnlineLevel2 from "./onlineLevel2.js";
import OnlineLevel3 from "./onlineLevel3.js";
import MainMenu from "./mainMenu.js";
import Controls from "./controls.js";
import Resources from "./resources.js";
import PauseMenu from "./pauseMenu.js";
import ChatMenu from "./chatMenu.js";
import GameOver from "./gameOver.js";
import OnlineSelector from "./onlineSelector.js";
import Lobby from "./lobby.js";
import SelectLevel from "./selectLevel.js";
import Victory from "./victory.js";
import Level1 from "./level1.js";
import Level2 from "./level2.js";
import Level3 from "./level3.js";
import InfiniteLevel1 from "./infiniteLevel1.js";
import InfiniteLevel2 from "./infiniteLevel2.js";
import InfiniteLevel3 from "./infiniteLevel3.js";

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
let infiniteOnlineLevel2 = new InfiniteOnlineLevel1(gameWidth, gameHeight);
let infiniteOnlineLevel3 = new InfiniteOnlineLevel1(gameWidth, gameHeight);
let onlineLevel1 = new InfiniteOnlineLevel1(gameWidth, gameHeight);
let onlineLevel2 = new InfiniteOnlineLevel2(gameWidth, gameHeight);
let onlineLevel3 = new InfiniteOnlineLevel3(gameWidth, gameHeight);
let infiniteLevel1 = new InfiniteLevel1(gameWidth, gameHeight, game);
let infiniteLevel2 = new InfiniteLevel2(gameWidth, gameHeight, game);
let infiniteLevel3 = new InfiniteLevel3(gameWidth, gameHeight, game);
let level1 = new Level1(gameWidth, gameHeight, game);
let level2 = new Level2(gameWidth, gameHeight, game);
let level3 = new Level3(gameWidth, gameHeight, game);
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
game.scene.add('InfiniteOnlineLevel2', infiniteOnlineLevel2);
game.scene.add('InfiniteOnlineLevel3', infiniteOnlineLevel3);
game.scene.add('OnlineLevel1', onlineLevel1);
game.scene.add('OnlineLevel2', onlineLevel2);
game.scene.add('OnlineLevel3', onlineLevel3);
game.scene.add('Level1', level1);
game.scene.add('Level2', level2);
game.scene.add('Level3', level3);
game.scene.add('InfiniteLevel1', infiniteLevel1);
game.scene.add('InfiniteLevel2', infiniteLevel2);
game.scene.add('InfiniteLevel3', infiniteLevel3);
game.scene.add('Pause', pauseMenu);
game.scene.add('GameOver', gameOver);
game.scene.add('ChatMenu', chatMenu);
game.scene.add('OnlineSelector', onlineSelector);
game.scene.add('Lobby', lobby);
game.scene.add('Victory', victory);

// - - - - - - - - - - - - - - - - - - - - - - -

game.scene.start('MainMenu');