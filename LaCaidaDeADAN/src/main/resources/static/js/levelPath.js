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
                    [ -1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0, -1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,0, -1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];


var rightMap =      [
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                    [  -1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [  -1,0,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                    ];

let turretArray;
let adan;

let graphics;
let leftPath;
let rightPath;

let turrets;
let leftEnemies1;
let leftEnemies2;
let rightEnemies1;
let rightEnemies2;
let energyTurrets;
let enemyBullets;
let enemyHP = 100;

let bullets;

let firstPlayer = new Player(100);
let secondPlayer = new Player(100);

let keyPosX = 0;
let keyPosY = 0;

let selectImage;

let levelPaused = false;

var input;
let rect;
let rect1;
let buyButton;
let upgradeButton;
let sellButton;
let laserWeapon1Button;
let energyWeapon1Button;
let bulletWeapon1Button;

let buyButton1;
let upgradeButton1;
let sellButton1;
let laserWeapon1Button1;
let energyWeapon1Button1;
let bulletWeapon1Button1;
let menuRightOpenX = undefined;
let menuRightOpenY = undefined;
let menuLeftOpenX = undefined;
let menuLeftOpenY = undefined;

let buyMenuRightOpen = false;
let weaponMenuRightOpen = false;
let buyMenuLeftOpen = false;
let weaponMenuLeftOpen = false;

let damageTimer = 100;
let deltaDamage = 0;

let cellSize = 64;

class LevelPath extends Phaser.Scene {
    constructor(screenWidth, screenHeight, game){
        super();

        Phaser.Scene.call(this, {key: 'Level'})

        this.game = game;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        
        this.SPAWN_SPEED = 4000;
        
    }

    preload() {
        this.load.image('turret', 'assets/metralleta high-res.png');
        this.load.image('enemy', 'assets/pixil-frame-0.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('map', 'assets/Nivel1_map.png');
        this.load.image('select', 'assets/select.png');
        this.load.image('energyTurret', 'assets/energia.png');
        this.load.image('skelly', 'assets/skelly.png');
        this.load.image('adan', 'assets/cuadrado.png');

        // botones
        this.load.image('square', 'assets/cuadrado.png');
        this.load.image('storeIcons', 'assets/iconos_tienda.png');

        // Sonidos
        this.load.audio('shoot', 'assets/turret_shoot.mp3');

        this.load.image('energy', 'assets/energy.png');
        this.load.image('coin', 'assets/coin.png');
    }
    
    create() {
        
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map').setScale(0.2);
        selectImage = this.add.image(keyPosX * 64 + 32, keyPosY * 64 + 32, 'select').setScale(3);
        adan = this.physics.add.image(this.screenWidth/2, this.screenHeight/2 - 32, 'adan').setScale(0.15);
        

        graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1);
        
        leftPath = this.add.path(0, cellSize*3.5);
        leftPath.lineTo(cellSize*3.5, cellSize*3.5);
        leftPath.lineTo(cellSize*3.5, cellSize*10.5);
        leftPath.lineTo(cellSize*9.5, cellSize*10.5);
        leftPath.lineTo(cellSize*9.5, cellSize*6.5);
        leftPath.lineTo(cellSize*12.75, cellSize*6.5);
        
        //leftPath.draw(graphics);
        //this.drawLeftGrid();

        rightPath = this.add.path(this.screenWidth, cellSize*3.5);
        rightPath.lineTo(this.screenWidth - cellSize*3.5, cellSize*3.5);
        rightPath.lineTo(this.screenWidth - cellSize*3.5, cellSize*10.5);
        rightPath.lineTo(this.screenWidth - cellSize*9.5, cellSize*10.5);
        rightPath.lineTo(this.screenWidth - cellSize*9.5, cellSize*6.5);
        rightPath.lineTo(this.screenWidth - cellSize*12.75, cellSize*6.5);

        //rightPath.draw(graphics);
        //this.drawRightGrid();

        this.firstPlayerMoneyText = this.add.text(90, 13, '50', { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        let firstPlayerMoneyImage = this.add.image(50,50, 'coin').setScale(0.08);
        this.firstPlayerHPText = this.add.text((this.screenWidth/2) - 256, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        let firstPlayerEnergyImage = this.add.image(50,this.screenHeight-50, 'energy').setScale(0.8);
        this.firstPlayerEnergyText = this.add.text(90, this.screenHeight-85, firstPlayer.getEnergy(), {fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        this.secondPlayerMoneyText = this.add.text(this.screenWidth-152, 13, '50', { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        let secondPlayerMoneyImage = this.add.image(this.screenWidth - 50,50, 'coin').setScale(0.08);
        this.secondPlayerHPText = this.add.text((this.screenWidth/2) + 128, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        let secondPlayerEnergyImage = this.add.image(this.screenWidth-50,this.screenHeight-53, 'energy').setScale(0.8);
        this.secondPlayerEnergyText = this.add.text(this.screenWidth-152, this.screenHeight-85, secondPlayer.getEnergy(), {fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        leftEnemies1 = this.physics.add.group({
            classType: TurretEnemy,
            runChildUpdate: true
        });

        leftEnemies2 = this.physics.add.group({
            classType: SkellyEnemy,
            runChildUpdate: true
        });

        rightEnemies1 = this.physics.add.group({
            classType: TurretEnemy,
            runChildUpdate: true
        });

        rightEnemies2 = this.physics.add.group({
            classType: SkellyEnemy,
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

        enemyBullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });

        
        this.physics.add.overlap(leftEnemies1, bullets, damageEnemy);
        this.physics.add.overlap(leftEnemies2, bullets, damageEnemy);

        this.physics.add.overlap(rightEnemies1, bullets, damageEnemy);
        this.physics.add.overlap(rightEnemies2, bullets, damageEnemy);

        this.physics.add.overlap(enemyBullets, adan, damagePlayer);

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

        // botones tienda
        input = this.input;

        //TIENDA DERECHA
        buyButton = this.add.image(1000, 200, 'storeIcons').setCrop(288*8,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        buyButton.setInteractive();

        upgradeButton = this.add.image(1000 - 50*3, 200, 'storeIcons').setCrop(288*9,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        upgradeButton.setInteractive();

        sellButton = this.add.image(1000 - 50*6, 200, 'storeIcons').setCrop(288*10,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        sellButton.setInteractive();

        
        //ARMAS
        laserWeapon1Button = this.add.image(1000, 200, 'storeIcons').setCrop(0,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        laserWeapon1Button.setInteractive();

        bulletWeapon1Button = this.add.image(1000 - 50*3, 200, 'storeIcons').setCrop(288*3,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        bulletWeapon1Button.setInteractive();

        energyWeapon1Button = this.add.image(1000 - 50*6, 200, 'storeIcons').setCrop(288*6,0,288,288).setScale(0.2).setActive(false).setVisible(false).setTint(0x808080);
        energyWeapon1Button.setInteractive();


        //TIENDA IZQUIERDA
        buyButton1 = this.add.image(1000, 200, 'storeIcons').setCrop(288*8,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        buyButton1.setInteractive();

        upgradeButton1 = this.add.image(1000 - 50*3, 200, 'storeIcons').setCrop(288*9,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        upgradeButton1.setInteractive();

        sellButton1 = this.add.image(1000 - 50*6, 200, 'storeIcons').setCrop(288*10,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        sellButton1.setInteractive();

        
        //ARMAS
        laserWeapon1Button1 = this.add.image(1000, 200, 'storeIcons').setCrop(0,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        laserWeapon1Button1.setInteractive();

        bulletWeapon1Button1 = this.add.image(1000 - 50*3, 200, 'storeIcons').setCrop(288*3,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        bulletWeapon1Button1.setInteractive();

        energyWeapon1Button1 = this.add.image(1000 - 50*6, 200, 'storeIcons').setCrop(288*6,0,288,288).setScale(0.2).setActive(false).setVisible(false).setTint(0x808080);
        energyWeapon1Button1.setInteractive();
    
    }

    getBullets(){
        return bullets;
    }
    
    openCloseLaserWeapons(pointer){
        let i = Math.floor(pointer.y/64);
        let j = Math.floor((pointer.x/64)%13);
        
        console.log(i);
        console.log(j);

        i*=64;
        j*=64;
    }


    onBuildButton(texture, pointer){
        let i = Math.floor(pointer.y/64);
        let j;
        if(pointer.x/64  >= 13){
        j = Math.floor((pointer.x / 64) % 13);
        }
        else 
            j=undefined;

        if(texture = "laserWeapon1" && canPlaceTurretRight(i, j, 20, 10)){
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
    

    update(time, delta) {
        deltaDamage -= delta;
        if(deltaDamage<=0) adan.clearTint();
       
        this.firstPlayerMoneyText.setText(firstPlayer.getMoney());
        this.firstPlayerHPText.setText("Vida: " + firstPlayer.getCurrentHP());
        this.firstPlayerEnergyText.setText(firstPlayer.getEnergy());

        this.secondPlayerMoneyText.setText(secondPlayer.getMoney());
        this.secondPlayerHPText.setText("Vida: " + secondPlayer.getCurrentHP());
        this.secondPlayerEnergyText.setText(secondPlayer.getEnergy());

        let tur = turrets.getChildren().concat(energyTurrets.getChildren());
        for(var p = 0; p<tur.length; p++){
            if(tur[p].x === 0){
                tur[p].destroy();
            }
        }

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
            let x = Math.random();
            let y = Math.random();
            let leftEnemy;
            if(x<=0.5){
                leftEnemy = leftEnemies1.get();
            }
            else{
                leftEnemy = leftEnemies2.get();
            }

            let rightEnemy;
            if(y<0.5){
                rightEnemy = rightEnemies1.get();
            }
            else{
                rightEnemy = rightEnemies2.get();
            }

            if(leftEnemy){
                leftEnemy.setMaxHP(enemyHP);
                leftEnemy.setActive(true);
                leftEnemy.setVisible(true);

                leftEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
            }

            if(rightEnemy){
                rightEnemy.setMaxHP(enemyHP);
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
            
            case('Enter'):
                onEnter();
            break;
        }

        selectImage.setPosition(keyPosX * 64 + 32, keyPosY * 64 + 32);
    }

    onClickHandler(pointer) {
        
        let i = Math.floor(pointer.y/64);
        let j;

        if(pointer.x/64  >= 16) {
            j = Math.floor(((pointer.x - cellSize*2)/ 64 ) % 14);
        } else {
            j=undefined;
        }

        if(pointer.button === 0){

            onRightClick(pointer);
        }
    }

    getEnemy(x, y, distance, side) {
        var leftEnemyUnits = leftEnemies1.getChildren().concat(leftEnemies2.getChildren());
        var rightEnemyUnits = rightEnemies1.getChildren().concat(rightEnemies2.getChildren());
    
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

    addEnemyBullet(x, y, angle){
        let bullet = enemyBullets.get();

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
        updateCosts();
    }
}

function damagePlayer(adan, bullet){
    if(bullet.active===true && adan.active === true){
        bullet.setActive(false);
        bullet.setVisible(false);
        adan.setTint(0xff0000);
        deltaDamage = damageTimer;
    }
}

function onRightClick(pointer)
{
    console.log("ONRIGHTCLICK");
    let i = Math.floor(pointer.y/64);
    let j = Math.floor(pointer.x/64);
    
    //console.log("POSICION: " + j + "," + i + ":" + rightMap[i][j]);
    console.log("MENU: " +menuRightOpenY +","+ menuRightOpenX);
    //console.log("i,j: " +i +","+ j%16);

    if(rightMap[i][j%16]!==-1 && rightMap[i][j%16]!==undefined) openCloseMenu(i, j, false);
    else if(i===menuRightOpenX+1 && j%16===menuRightOpenY-1 && buyMenuRightOpen) openCloseWeapons(false);
    else if(i===menuRightOpenX+2 && j%16===menuRightOpenY-1 && weaponMenuRightOpen) PlaceLaserTurret(false);
    else if(i===menuRightOpenX+3 && j%16===menuRightOpenY-1 && weaponMenuRightOpen) PlaceEnergyTurret(false);
    else if(i===menuRightOpenX+1 && j%16===menuRightOpenY+1 && buyMenuRightOpen) sellTurret(i, j, rightMap, menuRightOpenX, menuRightOpenY);
}

function onEnter()
{
    console.log("OnEnter");
    let i = keyPosY;
    let j = keyPosX;

    console.log("POSICION: " + j + "," + i + ":" + rightMap[j][i]);

    console.log("MENU: " +menuLeftOpenX +","+ menuLeftOpenY);
    console.log("i,j: " +i +","+ j);
    console.log(buyMenuLeftOpen);
    if(leftMap[i][j]!==-1 && leftMap[i][j]!==undefined) openCloseMenu(i, j, true);
    else if(i===menuLeftOpenX+1 && j===menuLeftOpenY-1 && buyMenuLeftOpen) openCloseWeapons(true);
    else if(i===menuLeftOpenX+2 && j===menuLeftOpenY-1 && weaponMenuLeftOpen) PlaceLaserTurret(true);
    else if(i===menuLeftOpenX+3 && j===menuLeftOpenY-1 && weaponMenuLeftOpen) PlaceEnergyTurret(true);
    else if(i===menuLeftOpenX+1 && j===menuLeftOpenY+1 && buyMenuLeftOpen) sellTurret(i, j, leftMap, menuLeftOpenX, menuLeftOpenY);
}

function openCloseMenu(i, j, menu){

    if(menu===false){
        console.log("openCloseMenu1");
        menuRightOpenX = i;
        menuRightOpenY = j%16;

        i*=64;
        j*=64;

        buyButton.x = j - 200;
        buyButton.y = i + 96;

        upgradeButton.x = j - 198;
        upgradeButton.y = i + 96;

        sellButton.x = j - 196;
        sellButton.y = i + 96;

        activeInactive(buyButton, upgradeButton, sellButton);

        laserWeapon1Button.setActive(false);
        laserWeapon1Button.setVisible(false);

        bulletWeapon1Button.setActive(false);
        bulletWeapon1Button.setVisible(false);

        energyWeapon1Button.setActive(false);
        energyWeapon1Button.setVisible(false);
        
        if(buyButton.active) buyMenuRightOpen=true;
        weaponMenuRightOpen=false;
    }
    else {
        console.log("openCloseMenu2");
        menuLeftOpenX = i;
        menuLeftOpenY = j;

        i*=64;
        j*=64;

        buyButton1.x = j - 200;
        buyButton1.y = i + 96;

        upgradeButton1.x = j - 198;
        upgradeButton1.y = i + 96;

        sellButton1.x = j - 196;
        sellButton1.y = i + 96;

        activeInactive(buyButton1, upgradeButton1, sellButton1);

        if(buyButton1.active) buyMenuLeftOpen=true;

        laserWeapon1Button1.setActive(false);
        laserWeapon1Button1.setVisible(false);

        bulletWeapon1Button1.setActive(false);
        bulletWeapon1Button1.setVisible(false);

        energyWeapon1Button1.setActive(false);
        energyWeapon1Button1.setVisible(false);

        weaponMenuLeftOpen=false;
    }
    
}

function activeInactive (button1, button2, button3){
    button1.setActive(!button1.active);
    button1.setVisible(!button1.visible);

    button2.setActive(!button2.active);
    button2.setVisible(!button2.visible);

    button3.setActive(!button3.active);
    button3.setVisible(!button3.visible);
}

function openCloseWeapons(menu){
    if(menu===false){
        console.log("openCloseWeapons1");
        laserWeapon1Button.x = buyButton.x + 456;
        laserWeapon1Button.y = buyButton.y + 64;
        bulletWeapon1Button.x = buyButton.x + 283;
        bulletWeapon1Button.y = buyButton.y + 127;
        energyWeapon1Button.x = buyButton.x + 110;
        energyWeapon1Button.y = buyButton.y + 192;

        activeInactive(laserWeapon1Button,bulletWeapon1Button,energyWeapon1Button);

        if(laserWeapon1Button.active) weaponMenuRightOpen = true;

    } else{
        console.log("openCloseWeapons2");
        laserWeapon1Button1.x = buyButton1.x + 456;
        laserWeapon1Button1.y = buyButton1.y + 64;
        bulletWeapon1Button1.x = buyButton1.x + 283;
        bulletWeapon1Button1.y = buyButton1.y + 127;
        energyWeapon1Button1.x = buyButton1.x + 110;
        energyWeapon1Button1.y = buyButton1.y + 192;

        activeInactive(laserWeapon1Button1,bulletWeapon1Button1,energyWeapon1Button1);

        if(laserWeapon1Button1.active) weaponMenuLeftOpen = true;
    }
}  

buyTurret.onmessage=function(message){
	if(JSON.parse(message.data.side)==1){ clickPlaceTurret(JSON.parse(message.data.turret), 
	JSON.parse(message.data.player)); }
	else { keyPlaceTurret(JSON.parse(message.data.turret), 
	JSON.parse(message.data.player)); }
}

function keyPlaceTurret(turret, player){
    console.log("keyPlaceTurret");

        if(canPlaceTurretLeft(menuLeftOpenX, menuLeftOpenY, turret.cost, turret.energy)) {
            if(turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.setSide('left');
                turret.placeLeft(menuLeftOpenX, menuLeftOpenY, leftMap);
                player.addMoney(-turret.getCost());
                player.addEnergy(-turret.getEnergy());    
            }
            openCloseMenu(menuLeftOpenX, menuLeftOpenY, true);
        }
        updateCosts();
}

function clickPlaceTurret(turret, player){
    console.log("clickPlaceTurret");
    if(canPlaceTurretRight(menuRightOpenX, menuRightOpenY, turret.cost, turret.energy)) {

        if(turret){
            turret.setActive(true);
            turret.setVisible(true);
            turret.setSide('right');
            turret.placeRight(menuRightOpenX, menuRightOpenY, rightMap);
            player.addMoney(-turret.getCost());
            player.addEnergy(-turret.getEnergy());
        }
        openCloseMenu(menuRightOpenX, menuRightOpenY, false);
    }
    //Aqui haria falta las coordenadas de la torreta, tipo y si es el jugador de la derecha o la izquierda
    var jsonData = {
		player: player,
		turret: turret,
		side: 1,
		//TIPO		
	}
    buyTurret.send(JSON.stringify(jsonData));  
    updateCosts();
}

function PlaceLaserTurret(isKeyOrClick){
    let turret = turrets.get();
    if(isKeyOrClick===true) { keyPlaceTurret(turret, firstPlayer); }
    else { clickPlaceTurret(turret, secondPlayer); }
}

function PlaceEnergyTurret(isKeyOrClick){
    let turret = energyTurrets.get();
    if(isKeyOrClick===true) { keyPlaceTurret(turret, firstPlayer); }
    else { clickPlaceTurret(turret, secondPlayer); }
}

function updateCosts(){
    let turret = turrets.get();
    if(secondPlayer.money < turret.getCost()) laserWeapon1Button.setTint(0x808080);
    else laserWeapon1Button.clearTint();

    let energyTurret = energyTurrets.get();
    if(secondPlayer.money < energyTurret.getCost()) bulletWeapon1Button.setTint(0x808080);
    else bulletWeapon1Button.clearTint();
}

function sellTurret(x,y,map,menuX, menuY){

    console.log("Sell turret");
    if(map[menuX][menuY]===1){
        let turret = turrets.getChildren();
        let energyTurret = energyTurrets.getChildren();
        for(var i=0; i<turret.length; i++){
            if(turret[i].getCoordX() === menuX && turret[i].getCoordY() === menuY){
                if(map === rightMap) {
                    secondPlayer.money+=turret[i].getCost()/2;
                    secondPlayer.energy+=turret[i].energy;
                }
                else {
                    firstPlayer.money+=turret[i].getCost()/2;
                    firstPlayer.energy+=turret[i].energy;
                }
                map[menuX][menuY]=0; 
                turret[i].destroy();
                if(menuX === menuLeftOpenX) openCloseMenu(x,y,true);
                else openCloseMenu(x,y,false);

            } else if(energyTurret[i].getCoordX() === menuX && energyTurret[i].getCoordY() === menuY){
                if(map === rightMap) {
                    secondPlayer.money+=energyTurret[i].getCost()/2;
                    secondPlayer.energy+=energyTurret[i].getEnergy();
                }
                else {
                    firstPlayer.money+=energyTurret[i].getCost()/2;
                    firstPlayer.energy+=energyTurret[i].getEnergy();
                }
                map[menuX][menuY]=0; 
                energyTurret[i].destroy();
                if(menuX === menuLeftOpenX) openCloseMenu(x,y,true);
                else openCloseMenu(x,y,false);
            }
        } 
    }
}



export default LevelPath;