import Bullet from './bullet.js';
import Enemy from './enemy.js';
import Turret from './turret.js';
import Player from './player.js';

var map =      [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

let turrets;
let enemies;
let bullets;
let secondPlayer;
let firstPlayer = new Player(100);
var scoreText;

class LevelPath extends Phaser.Scene {
    preload() {
        this.load.image('turret', 'assets/metralleta high-res.png');
        this.load.image('enemy', 'assets/pixil-frame-0.png');
        this.load.image('bullet', 'assets/bullet.png');
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

        scoreText = this.add.text(440, 16, 'Money: 50', { fontSize: '32px', fill: '#fff' });

        enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });
        
        turrets = this.add.group({
            classType: Turret,
            runChildUpdate: true
        });
        
        bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });
        
       

        this.physics.add.overlap(enemies, bullets, damageEnemy);

        this.nextEnemy = 0;
        this.input.on('pointerdown', this.placeTurret);
    }
    getFirstPlayer(){
        return firstPlayer;
    }

    getEnemies(){
        return enemies;
    }

    getBullets(){
        return bullets;
    }

    update(time, delta) {
        scoreText.setText('Money: ' + firstPlayer.getMoney());
        if(time > this.nextEnemy){
            let enemy = enemies.get();

            if(enemy){
                enemy.setActive(true);
                enemy.setVisible(true);

                enemy.startOnPath(this.path);
                this.nextEnemy = time + 2000;
            }
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
        

        if(canPlaceTurret(i, j, 20)){
            let turret = turrets.get();
            
            if(turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j, map);
                firstPlayer.addMoney(-(turret.getCost()));
            }
        }
    }
    
    getEnemy(x, y, distance) {
        var enemyUnits = enemies.getChildren();
    
        for(var i = 0; i < enemyUnits.length; i++){
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
                return enemyUnits[i];
        }
    
        return false;
    }

    addBullet(x, y, angle){
        let bullet = bullets.get();
        if(bullet){
            bullet.fire(x, y, angle);
        }
    }
    
}

function canPlaceTurret(i, j, turretcost) {
    var sample = false;
    if(firstPlayer.getMoney()>= turretcost && map[i][j] === 0 ){
        sample = true;
    }
    return sample
    
    //return 
}

function damageEnemy(enemy, bullet){
    if(enemy.active === true && bullet.active === true){
        enemy.takeDamage(bullet.getDamage(), bullet);

        bullet.setActive(false);
        bullet.setVisible(false);
    }
}

export default LevelPath;