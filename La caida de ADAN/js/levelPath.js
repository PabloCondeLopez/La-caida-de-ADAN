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


var rightMap =  [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [  0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [  0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let graphics;
let leftPath;
let rightPath;

let turrets;
let leftEnemies;
let rightEnemies;

let bullets;

let firstPlayer = new Player(100);
let secondPlayer = new Player(100);

let keyPosX = 23;
let keyPosY = 0;

let normalizedKeyPosX = 10;

let selectImage;

class LevelPath extends Phaser.Scene {
    constructor(screenWidht, screenHeight){
        super();

        Phaser.Scene.call(this, {key: 'Level'})

        this.screenWidht = screenWidht;
        this.screenHeight = screenHeight;
        
        this.SPAWN_SPEED = 5000;
    }

    preload() {
        this.load.image('turret', 'assets/metralleta high-res.png');
        this.load.image('enemy', 'assets/pixil-frame-0.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('map', 'assets/Mapa1.png');
        this.load.image('select', 'assets/select.png');
    }
    
    create() {
        this.add.image(this.screenWidht / 2, this.screenHeight / 2, 'map').setScale(0.2);
        selectImage = this.add.image(keyPosX * 64 + 32, keyPosY * 64 + 32, 'select').setScale(3);

        graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1);
        
        leftPath = this.add.path(0, 228);
        leftPath.lineTo(225, 228);
        leftPath.lineTo(225, 804);
        leftPath.lineTo(545, 804);
        leftPath.lineTo(545, 548);
        leftPath.lineTo(705, 548);
        
        //leftPath.draw(graphics);
        //this.drawLeftGrid();

        rightPath = this.add.path(this.screenWidht, 228);
        rightPath.lineTo(1312, 228);
        rightPath.lineTo(1312, 804);
        rightPath.lineTo(992, 804);
        rightPath.lineTo(992, 548);
        rightPath.lineTo(832, 548);

        //rightPath.draw(graphics);
        //this.drawRightGrid();

        this.firstPlayerMoneyText = this.add.text(500, 16, 'Money: 50', { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.firstPlayerHPText = this.add.text(20, 16, 'HP: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        this.secondPlayerMoneyText = this.add.text(1350, 16, 'Money: 50', { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.secondPlayerHPText = this.add.text(870, 16, 'HP: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        leftEnemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });

        rightEnemies = this.physics.add.group({
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
        
        this.physics.add.overlap(leftEnemies, bullets, damageEnemy);
        this.physics.add.overlap(rightEnemies, bullets, damageEnemy);

        this.nextEnemy = 0;

        this.input.on('pointerdown', this.placeTurret);
        this.input.keyboard.on('keydown', this.placeTurretKeyboard);
    }
    
    getLeftEnemies(){
        return leftEnemies;
    }

    getBullets(){
        return bullets;
    }

    update(time, delta) {
        this.firstPlayerMoneyText.setText('Money: ' + firstPlayer.getMoney());
        this.firstPlayerHPText.setText("HP: " + firstPlayer.getCurrentHP());

        this.secondPlayerMoneyText.setText('Money: ' + secondPlayer.getMoney());
        this.secondPlayerHPText.setText("HP: " + secondPlayer.getCurrentHP());

        if(firstPlayer.getCurrentHP() <= 0 || secondPlayer.getCurrentHP() <= 0)
            this.endGame();

        if(time > this.nextEnemy){
            let leftEnemy = leftEnemies.get();
            let rightEnemy = rightEnemies.get();

            if(leftEnemy){
                leftEnemy.setActive(true);
                leftEnemy.setVisible(true);

                leftEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
            }

            if(rightEnemy){
                rightEnemy.setActive(true);
                rightEnemy.setVisible(true);

                rightEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
            }

            this.nextEnemy = time + this.SPAWN_SPEED;
        }
    }

    drawLeftGrid() {
        graphics.lineStyle(1, 0x0000ff, 0.8);

        for(var i = 0; i < 17; i++){
            graphics.moveTo(0, i * 64);
            graphics.lineTo(this.screenWidht / 2 - 64, i * 64);
        }

        for(var j = 0; j < 12; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, this.screenHeight);
        }
        graphics.strokePath();

    }

    drawRightGrid() {
        graphics.lineStyle(1, 0x0000ff, 0.8);

        for(var i = 0; i < 17; i++){
            graphics.moveTo(this.screenWidht, i * 64);
            graphics.lineTo(this.screenWidht / 2 + 64, i * 64);
        }

        for(var j = 0; j < 12; j++) {
            graphics.moveTo(this.screenWidht - j * 64, 0);
            graphics.lineTo(this.screenWidht - j * 64, this.screenHeight);
        }
        graphics.strokePath();

    }

    placeTurretKeyboard(event) {
        switch(event.key) {
            case('Enter'):
                let i = Math.floor(keyPosY);
                let j = Math.floor(normalizedKeyPosX);

                console.log(rightMap[i][j]);

                if(canPlaceTurretRight(i, j, 20)) {
                    let turret = turrets.get();

                    if(turret) {
                        turret.setActive(true);
                        turret.setVisible(true);
                        turret.placeRight(i, j, rightMap);
                        secondPlayer.addMoney(-turret.getCost());
                    }
                }

                break;

            case('a' || 'A'):
                if(keyPosX - 1 >= 13) { 
                    keyPosX--;
                    normalizedKeyPosX--;
                }
                break;
            
            case('d' || 'D'):
                if(keyPosX + 1 < 24){
                    keyPosX++;
                    normalizedKeyPosX++;
                }
                break;
            
            case('w' || 'W'):
                if(keyPosY - 1 >= 0){
                    keyPosY--;
                }
                break;
            
            case('s' || 'S'):
                if(keyPosY + 1 < 16){
                    keyPosY++;
                }
                break;
        }

        console.log(normalizedKeyPosX + ', ' + keyPosY);
        selectImage.setPosition(keyPosX * 64 + 32, keyPosY * 64 + 32);
    }

    placeTurret(pointer) {
        let i = Math.floor(pointer.y/64);
        let j = Math.floor(pointer.x/64);

        if(canPlaceTurretLeft(i, j, 20)){
            let turret = turrets.get();

            if(turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.placeLeft(i, j, leftMap);
                firstPlayer.addMoney(-turret.getCost());
            }
        }
        
    }
    
    getEnemy(x, y, distance) {
        var leftEnemyUnits = leftEnemies.getChildren();
        var rightEnemyUnits = rightEnemies.getChildren();
    
        for(var i = 0; i < leftEnemyUnits.length; i++){
            if(leftEnemyUnits[i].active && Phaser.Math.Distance.Between(x, y, leftEnemyUnits[i].x, leftEnemyUnits[i].y) <= distance)
                return leftEnemyUnits[i];
        }

        for(var i = 0; i < rightEnemyUnits.length; i++){
            if(rightEnemyUnits[i].active && Phaser.Math.Distance.Between(x, y, rightEnemyUnits[i].x, leftEnemyUnits[i].y) <= distance)
                return rightEnemyUnits[i];
        }
    
        return false;
    }

    addBullet(x, y, angle){
        let bullet = bullets.get();

        if(bullet){
            bullet.fire(x, y, angle);
        }
    }

    endGame(){
        this.add.text(this.screenWidht / 2, this.screenHeight / 2, 'GAME OVER', { fontSize: '110px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 10).setOrigin(0.5, 0.5);

        this.scene.pause();
    }
    
}

function canPlaceTurretLeft(i, j, turretcost) {
    var canPlace = false;
    
    if(firstPlayer.getMoney() >= turretcost && leftMap[i][j] === 0 ){
        canPlace = true;
    }

    return canPlace
}

function canPlaceTurretRight(i, j, turretcost) {
    var canPlace = false;

    if(secondPlayer.getMoney() >= turretcost && rightMap[i][j] === 0 ){
        canPlace = true;
    }

    return canPlace
}

function damageEnemy(enemy, bullet){
    if(enemy.active === true && bullet.active === true){
        enemy.takeDamage(bullet.getDamage(), bullet);

        bullet.setActive(false);
        bullet.setVisible(false);
    }
}

export default LevelPath;