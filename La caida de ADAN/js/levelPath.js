import Bullet from './bullet.js';
import Enemy from './enemy.js';
import TurretEnemy from './turretEnemy.js';
import SkellyEnemy from './skellyEnemy.js';
import Turret from './turret.js';
import Player from './player.js';
import EnergyTurret from './energyTurret.js';
import BuyMenu from './buyMenu.js';

var leftMap =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];


var rightMap =      [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let graphics;
let leftPath;
let rightPath;

let turrets;
let leftEnemies;
let rightEnemies;
let energyTurrets;
let enemyHP = 100;

let bullets;

let firstPlayer = new Player(100);
let secondPlayer = new Player(100);

let keyPosX = 0;
let keyPosY = 0;

let selectImage;

let levelPaused = false;

class LevelPath extends Phaser.Scene {
    constructor(screenWidth, screenHeight){
        super();

        Phaser.Scene.call(this, {key: 'Level'})

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        
        this.SPAWN_SPEED = 4000;
    }

    preload() {
        this.load.image('turret', 'assets/metralleta high-res.png');
        this.load.image('enemy', 'assets/pixil-frame-0.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('map', 'assets/Fondo_de_juego_franja_ui.png');
        this.load.image('select', 'assets/select.png');
        this.load.image('energyTurret', 'assets/energia.png');
        this.load.image('skelly', 'assets/skelly.png');
    }
    
    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map');
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

        rightPath = this.add.path(this.screenWidth, 228);
        rightPath.lineTo(1312, 228);
        rightPath.lineTo(1312, 804);
        rightPath.lineTo(992, 804);
        rightPath.lineTo(992, 548);
        rightPath.lineTo(832, 548);

        //rightPath.draw(graphics);
        //this.drawRightGrid();

        this.firstPlayerMoneyText = this.add.text(20, 16, 'Peseta Coins: 50', { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.firstPlayerHPText = this.add.text(520, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.firstPlayerEnergyText = this.add.text(20, 964, 'Energía: ' + firstPlayer.getEnergy(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        this.secondPlayerMoneyText = this.add.text(1230, 16, 'Peseta Coins: 50', { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.secondPlayerHPText = this.add.text(870, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.secondPlayerEnergyText = this.add.text(1320, 964, 'Energía: ' + secondPlayer.getEnergy(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        leftEnemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });

        rightEnemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });
        
        energyTurrets = this.add.group({
            classType: EnergyTurret,
            runChildUpdate: true
        })

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
        this.pauseOnScene = false;

        this.input.on('pointerdown', this.onClickHandler);
        this.input.keyboard.on('keydown', this.onKeyboardHandler);

        firstPlayer.setHP(100);
        secondPlayer.setHP(100);

        firstPlayer.setEnergy(20);
        secondPlayer.setEnergy(20);

        firstPlayer.setMoney(50);
        secondPlayer.setMoney(50);

        this.resetMap();
    }
    
    getLeftEnemies(){
        return leftEnemies;
    }

    getBullets(){
        return bullets;
    }

    update(time, delta) {
       

        this.firstPlayerMoneyText.setText('Peseta Coins: ' + firstPlayer.getMoney());
        this.firstPlayerHPText.setText("Vida: " + firstPlayer.getCurrentHP());
        this.firstPlayerEnergyText.setText("Energía: " + firstPlayer.getEnergy());

        this.secondPlayerMoneyText.setText('Peseta Coins: ' + secondPlayer.getMoney());
        this.secondPlayerHPText.setText("Vida: " + secondPlayer.getCurrentHP());
        this.secondPlayerEnergyText.setText("Energía: " + secondPlayer.getEnergy());

        if(levelPaused) {
            levelPaused = false;

            if(!this.pauseOnScene) {
                this.scene.launch('PauseMenu');
                this.pauseOnScene = true;
            } else {
                this.scene.wake('PauseMenu');
            }
            
            this.scene.pause();
        }

        if(firstPlayer.getCurrentHP() <= 0 || secondPlayer.getCurrentHP() <= 0){
            this.endGame();
        }

        if(time > this.nextEnemy){
            enemyHP *= 1.05;
            let leftEnemy = new TurretEnemy(this.scene);
            leftEnemies.add(leftEnemy);
            let rightEnemy = rightEnemies.get();

            if(leftEnemy){
                leftEnemy.setHP(enemyHP);
                leftEnemy.setActive(true);
                leftEnemy.setVisible(true);

                leftEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
            }

            if(rightEnemy){
                rightEnemy.setHP(enemyHP);
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
            graphics.lineTo(this.screenWidth / 2 - 64, i * 64);
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
            graphics.moveTo(this.screenWidth, i * 64);
            graphics.lineTo(this.screenWidth / 2 + 64, i * 64);
        }

        for(var j = 0; j < 12; j++) {
            graphics.moveTo(this.screenWidth - j * 64, 0);
            graphics.lineTo(this.screenWidth - j * 64, this.screenHeight);
        }
        graphics.strokePath();

    }

    onKeyboardHandler(event) {
        switch(event.key) {
            case('e' || 'E'):
                let i = Math.floor(keyPosY);
                let j = Math.floor(keyPosX);

                if(canPlaceTurretLeft(i, j, 20, 0)) {
                    let energyTurret = energyTurrets.get();

                    if(energyTurret) {
                        energyTurret.setActive(true);
                        energyTurret.setVisible(true);
                        energyTurret.setSide('left');
                        energyTurret.placeLeft(i, j, leftMap);
                        firstPlayer.addMoney(-energyTurret.getCost());
                        firstPlayer.addEnergy(energyTurret.getEnergy());
                    }
                }

                break;

            case('q' || 'Q'):
                let m = Math.floor(keyPosY);
                let n = Math.floor(keyPosX);

                console.log(leftMap[m][n]);

                if(canPlaceTurretLeft(m, n, 20, 10)) {
                    let turret = turrets.get();

                    if(turret) {
                        turret.setActive(true);
                        turret.setVisible(true);
                        turret.setSide('left');
                        turret.placeLeft(m, n, leftMap);
                        firstPlayer.addMoney(-turret.getCost());
                        firstPlayer.addEnergy(-turret.getEnergy());
                    }
                }

                break;

            case('a' || 'A'):
                if(keyPosX - 1 >= 0) { 
                    keyPosX--;
                }
                break;
            
            case('d' || 'D'):
                if(keyPosX + 1 < 13){
                    keyPosX++;
                }
                break;
            
            case('w' || 'W'):
                if(keyPosY - 1 >= 0){
                    keyPosY--;
                }
                break;
            
            case('s' || 'S'):
                if(keyPosY + 1 < 14){
                    keyPosY++;
                }
                break;

            case('Escape'):
                levelPaused = true;
                break;
        }

        selectImage.setPosition(keyPosX * 64 + 32, keyPosY * 64 + 32);
    }

    onClickHandler(pointer) {
        let i = Math.floor(pointer.y/64);
        let j;
        if(pointer.x/64  >= 13){
        j = Math.floor((pointer.x / 64) % 13);
        }
        else 
            j=undefined;

        if(pointer.button === 0){

        if(canPlaceTurretRight(i, j, 20, 10)) {
            let turret = turrets.get();

            if(turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.setSide('right');
                turret.placeRight(i, j, rightMap);
                secondPlayer.addMoney(-turret.getCost());
                secondPlayer.addEnergy(-turret.getEnergy());
            }
        }
    }

        if (pointer.button===1){
            
            if(canPlaceTurretRight(i, j, 20, 0)) {
                let energyTurret = energyTurrets.get();

                if(energyTurret) {
                    energyTurret.setActive(true);
                    energyTurret.setVisible(true);
                    energyTurret.setSide('left');
                    energyTurret.placeRight(i, j, rightMap);
                    secondPlayer.addMoney(-energyTurret.getCost());
                    secondPlayer.addEnergy(energyTurret.getEnergy());
                }
            }
        }
    }

    getEnemy(x, y, distance, side) {
        var leftEnemyUnits = leftEnemies.getChildren();
        var rightEnemyUnits = rightEnemies.getChildren();
    
        if(side === 'left'){
            for(var i = 0; i < leftEnemyUnits.length; i++){
                if(leftEnemyUnits[i].active && Phaser.Math.Distance.Between(x, y, leftEnemyUnits[i].x, leftEnemyUnits[i].y) <= distance)
                    return leftEnemyUnits[i];
            }
        }
        else if(side === 'right'){
            for(var i = 0; i < rightEnemyUnits.length; i++){
                if(rightEnemyUnits[i].active && Phaser.Math.Distance.Between(x, y, rightEnemyUnits[i].x, rightEnemyUnits[i].y) <= distance)
                    return rightEnemyUnits[i];
            }
        }
    
        return false;
    }

    addBullet(x, y, angle){
        let bullet = bullets.get();

        if(bullet){
            bullet.fire(x, y, angle);
        }
    }

    resetMap() {
        for(var i = 0; i < leftMap.length; i++){
            for(var j = 0; j < leftMap[i].length; j++){
                if(leftMap[i][j] === 1) leftMap[i][j] = 0;
            }
        }

        for(var i = 0; i < rightMap.length; i++){
            for(var j = 0; j < rightMap[i].length; j++){
                if(rightMap[i][j] === 1) rightMap[i][j] = 0;
            }
        }
    }

    endGame(){
        this.scene.launch('GameOver');
        this.scene.pause();
    }
    
}

function canPlaceTurretLeft(i, j, turretcost, turretEnergy) {
    var canPlace = false;
    
    if(firstPlayer.getMoney() >= turretcost && firstPlayer.getEnergy() >= turretEnergy && leftMap[i][j] === 0 ){
        canPlace = true;
    }

    return canPlace
}

function canPlaceTurretRight(i, j, turretcost, turretEnergy) {
    var canPlace = false;

    if(secondPlayer.getMoney() >= turretcost && secondPlayer.getEnergy() >= turretEnergy && rightMap[i][j] === 0 ){
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