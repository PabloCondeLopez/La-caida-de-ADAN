import MainMenu from "./Scenes/MainMenu.js";

const gameWidth = 1280;
const gameHeight = 720;

let mainMenu = new MainMenu('MainMenu');

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
};

let game = new Phaser.Game(config);
game.scene.add('MainMenu', mainMenu);
game.scene.start('MainMenu');