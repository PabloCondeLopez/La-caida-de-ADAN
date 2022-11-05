import MainMenu from "./Scenes/MainMenu.js";

const gameWidth = 640;
const gameHeight = 512;

const ENEMY_SPEED = 1/10000;

let graphics;
let path;
let enemies;

class Level extends Phaser.Scene {
    preload() {
        this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    }

    create() {
        graphics = this.add.graphics();

        path = this.add.path(92, -32);
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 544);

        graphics.lineStyle(3, 0xffffff, 1);
        //path.draw(graphics);

        enemies = this.add.group({
            classType: Enemy,
            runChildUpdate: true
        })

        this.nextEnemy = 0;
    }

    update(time, delta) {
        if(time > this.nextEnemy){
            let enemy = enemies.get();

            if(enemy){
                enemy.setActive(true);
                enemy.setVisible(true);

                enemy.startOnPath();
                
                this.nextEnemy = time + 2000;
            }
        }
    }
}

class Enemy extends Phaser.GameObjects.Image {

    constructor(scene){
        super(scene, 0, 0)

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };
    }

    update (time, delta) {
        this.follower.t += ENEMY_SPEED * delta;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if(this.follower.t >= 1){
            this.setActive(false);
            this.setVisible(false);
        }
    }

    startOnPath() {
        this.follower.t = 0;

        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }
}

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