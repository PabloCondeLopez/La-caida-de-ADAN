import Bullet from './bullet.js';
import Enemy from './enemy.js'
import Turret from './turret.js'

var map =      [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

let turrets;

class LevelPath extends Phaser.Scene {
    preload() {
        this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    }

    create() {
        this.graphics = this.add.graphics();

        this.path = this.add.path(92, -32);
        this.path.lineTo(96, 164);
        this.path.lineTo(480, 164);
        this.path.lineTo(480, 544);

        this.graphics.lineStyle(3, 0xffffff, 1);
        this.path.draw(this.graphics);
        this.drawGrid();

        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });

        turrets = this.add.group({
            classType: Turret,
            runChildUpdate: true
        });

        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });

        this.nextEnemy = 0;
        this.enemyInScene = this.enemies.getChildren();

        this.input.on('pointerdown', this.placeTurret);
    }

    update(time, delta) {
        if(time > this.nextEnemy){
            let enemy = this.enemies.get();

            if(enemy){
                enemy.setActive(true);
                enemy.setVisible(true);

                enemy.startOnPath(this.path);
                this.nextEnemy = time + 2000;
                this.enemyInScene.push(enemy);
            }
        }

        for(var i = 0; i < this.enemyInScene.length; i++){
            this.enemyInScene[i].takeDamage(0.1);
        }
    }

    drawGrid() {
        this.graphics.lineStyle(1, 0x0000ff, 0.8);

        for(var i = 0; i < 8; i++){
            this.graphics.moveTo(0, i * 64);
            this.graphics.lineTo(640, i * 64);
        }

        for(var j = 0; j < 10; j++) {
            this.graphics.moveTo(j * 64, 0);
            this.graphics.lineTo(j * 64, 512);
        }
        this.graphics.strokePath();
    }

    placeTurret(pointer) {
        let i = Math.floor(pointer.y/64);
        let j = Math.floor(pointer.x/64);

        if(canPlaceTurret(i, j)){
            let turret = turrets.get();
            
            if(turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j, map);
                
                turret.setBullets(this.bullets);
            }
        }
    }    
    
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}



export default LevelPath;