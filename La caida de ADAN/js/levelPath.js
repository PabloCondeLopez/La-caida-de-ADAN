import Bullet from './bullet.js';
import Enemy from './enemy.js';
import Turret from './turret.js';
import Player from './player.js';

var leftMap =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let turrets;
let enemies;
let bullets;
let secondPlayer;
let firstPlayer = new Player(100);

class LevelPath extends Phaser.Scene {
    constructor(screenWidht, screenHeight){
        super();

        Phaser.Scene.call(this, {key: 'Level'})

        this.screenWidht = screenWidht;
        this.screenHeight = screenHeight;
    }

    preload() {
        this.load.image('turret', 'assets/metralleta high-res.png');
        this.load.image('enemy', 'assets/pixil-frame-0.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('map', 'assets/Mapa1.png')
    }
    
    create() {
        this.add.image(this.screenWidht / 2, this.screenHeight / 2, 'map').setScale(0.2);

        this.graphics = this.add.graphics();
        
        this.path = this.add.path(0, 228);
        this.path.lineTo(225, 228);
        this.path.lineTo(225, 804);
        this.path.lineTo(545, 804);
        this.path.lineTo(545, 548);
        this.path.lineTo(705, 548);
        
        //this.graphics.lineStyle(3, 0xffffff, 1);
        //this.path.draw(this.graphics);
        //this.drawLeftGrid();

        this.scoreText = this.add.text(440, 16, 'Money: 50', { fontSize: '32px', fill: '#fff' });

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
        this.scoreText.setText('Money: ' + firstPlayer.getMoney());
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

    drawLeftGrid() {
        this.graphics.lineStyle(1, 0x0000ff, 0.8);

        for(var i = 0; i < 17; i++){
            this.graphics.moveTo(0, i * 64);
            this.graphics.lineTo(this.screenWidht / 2 - 64, i * 64);
        }

        for(var j = 0; j < 12; j++) {
            this.graphics.moveTo(j * 64, 0);
            this.graphics.lineTo(j * 64, this.screenHeight);
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
                turret.place(i, j, leftMap);
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
    if(firstPlayer.getMoney()>= turretcost && leftMap[i][j] === 0 ){
        sample = true;
    }
    return sample
}

function damageEnemy(enemy, bullet){
    if(enemy.active === true && bullet.active === true){
        enemy.takeDamage(bullet.getDamage(), bullet);

        bullet.setActive(false);
        bullet.setVisible(false);
    }
}

export default LevelPath;