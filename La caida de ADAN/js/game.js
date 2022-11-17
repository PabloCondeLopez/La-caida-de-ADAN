import MainMenu from "./Scenes/MainMenu.js";
import Level from "./level.js";

const gameWidth = 640;
const gameHeight = 512;

//let mainMenu = new MainMenu('MainMenu');
let level1 = new Level();

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    scene: [ level1 ]

};

let game = new Phaser.Game(config);
//game.scene.add('MainMenu', mainMenu);
//game.scene.start('MainMenu');