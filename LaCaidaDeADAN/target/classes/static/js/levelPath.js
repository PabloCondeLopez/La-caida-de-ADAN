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
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];


var rightMap =      [
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                    [ -1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                    ];

let turretArray;

let graphics;
let leftPath;
let rightPath;

let turrets;
let leftEnemies1;
let leftEnemies2;
let rightEnemies1;
let rightEnemies2;
let energyTurrets;
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
let laserWeapon1Button;
let energyWeapon1Button;
let bulletWeapon1Button;
let buyButton;
let upgradeButton;
let sellButton;
let menuOpenX = undefined;
let menuOpenY = undefined;
let buyMenuOpen = false;
let weaponMenuOpen = false;

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

        // botones
        this.load.image('square', 'assets/cuadrado.png');
        this.load.image('storeIcons', 'assets/iconos_tienda.png');

        // Sonidos
        this.load.audio('shoot', 'assets/turret_shoot.mp3');
    }
    
    create() {
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map').setScale(0.2);
        selectImage = this.add.image(keyPosX * 64 + 32, keyPosY * 64 + 32, 'select').setScale(3);

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

        this.firstPlayerMoneyText = this.add.text(20, 16, 'Peseta Coins: 50', { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.firstPlayerHPText = this.add.text((this.screenWidth/2) - 256, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.firstPlayerEnergyText = this.add.text(20, this.screenHeight-50, 'Energía: ' + firstPlayer.getEnergy(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

        this.secondPlayerMoneyText = this.add.text(this.screenWidth-300, 16, 'Peseta Coins: 50', { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.secondPlayerHPText = this.add.text((this.screenWidth/2) + 128, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
        this.secondPlayerEnergyText = this.add.text(this.screenWidth-200, this.screenHeight-50, 'Energía: ' + secondPlayer.getEnergy(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);

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
        
        this.physics.add.overlap(leftEnemies1, bullets, damageEnemy);
        this.physics.add.overlap(leftEnemies2, bullets, damageEnemy);

        this.physics.add.overlap(rightEnemies1, bullets, damageEnemy);
        this.physics.add.overlap(rightEnemies2, bullets, damageEnemy);

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

        //TIENDA
        buyButton = this.add.image(1000, 200, 'storeIcons').setCrop(288*8,0,288,288).setScale(0.2).setActive(false).setVisible(false).on('pointerdown', openCloseWeapons);
        buyButton.setInteractive();

        upgradeButton = this.add.image(1000 - 50*3, 200, 'storeIcons').setCrop(288*9,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        upgradeButton.setInteractive();

        sellButton = this.add.image(1000 - 50*6, 200, 'storeIcons').setCrop(288*10,0,288,288).setScale(0.2).setActive(false).setVisible(false);
        sellButton.setInteractive();

        
        //ARMAS
        laserWeapon1Button = this.add.image(1000, 200, 'storeIcons').setCrop(0,0,288,288).setScale(0.2).setActive(false).setVisible(false).on('pointerdown', PlaceLaserTurret);
        laserWeapon1Button.setInteractive();

        bulletWeapon1Button = this.add.image(1000 - 50*3, 200, 'storeIcons').setCrop(288*3,0,288,288).setScale(0.2).setActive(false).setVisible(false).on('pointerdown', PlaceEnergyTurret);
        bulletWeapon1Button.setInteractive();

        energyWeapon1Button = this.add.image(1000 - 50*6, 200, 'storeIcons').setCrop(288*6,0,288,288).setScale(0.2).setActive(false).setVisible(false).setTint(0x808080);
        energyWeapon1Button.setInteractive();
    
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

        if (pointer.button===1){
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

function onRightClick(pointer)
{
    console.log("ONRIGHTCLICK");
    let i = Math.floor(pointer.y/64);
    let j = Math.floor(pointer.x/64);
    

    //console.log("POSICION: " + j%16 + "," + i + ":" + rightMap[j%16][i]);
    console.log("POSICION: " + j + "," + i + ":" + rightMap[i][j]);

    console.log("MENU: " +menuOpenY +","+ menuOpenX);
    console.log("i,j: " +i +","+ j%16);

    if(rightMap[i][j%16]!==-1 && rightMap[i][j%16]!==undefined) openCloseMenu(i, j);
    else if(i===menuOpenX+1 && j%16===menuOpenY-1 && buyMenuOpen) openCloseWeapons();
    else if(i===menuOpenX+2 && j%16===menuOpenY-1 && weaponMenuOpen) PlaceLaserTurret(false);
    else if(i===menuOpenX+3 && j%16===menuOpenY-1 && weaponMenuOpen) PlaceEnergyTurret(false);
    else if(i===menuOpenX+1 && j%16===menuOpenY+1 && buyMenuOpen) sellTurret(i, j, rightMap);
}

function onEnter()
{
    console.log("OnEnter");
    let i = keyPosY;
    let j = keyPosX;

    console.log("POSICION: " + j + "," + i + ":" + rightMap[j][i]);

    console.log("MENU: " +menuOpenX +","+ menuOpenY);
    console.log("i,j: " +i +","+ j);
    console.log(weaponMenuOpen);
    if(leftMap[i][j]!==-1 && leftMap[i][j]!==undefined) openCloseMenu(i, j);
    else if(i===menuOpenX+1 && j===menuOpenY-1 && buyMenuOpen) openCloseWeapons();
    else if(i===menuOpenX+2 && j===menuOpenY-1 && weaponMenuOpen) PlaceLaserTurret(true);
    else if(i===menuOpenX+3 && j===menuOpenY-1 && weaponMenuOpen) PlaceEnergyTurret(true);
    else if(i===menuOpenX+1 && j===menuOpenY+1 && buyMenuOpen) sellTurret(i, j, leftMap);
}

function openCloseMenu(i, j){

    console.log("openCloseMenu");
        menuOpenX = i;
        menuOpenY = j%16;

            i*=64;
            j*=64;

            buyButton.x = j - 200;
            buyButton.y = i + 96;

            upgradeButton.x = j - 198;
            upgradeButton.y = i + 96;

            sellButton.x = j - 196;
            sellButton.y = i + 96;

        
            buyButton.setActive(!buyButton.active);
            buyButton.setVisible(!buyButton.visible);

            upgradeButton.setActive(!upgradeButton.active);
            upgradeButton.setVisible(!upgradeButton.visible);

            sellButton.setActive(!sellButton.active);
            sellButton.setVisible(!sellButton.visible);

            laserWeapon1Button.setActive(false);
            laserWeapon1Button.setVisible(false);

            bulletWeapon1Button.setActive(false);
            bulletWeapon1Button.setVisible(false);

            energyWeapon1Button.setActive(false);
            energyWeapon1Button.setVisible(false);
        
            if(buyButton.active) buyMenuOpen=true;
    
}

function openCloseWeapons(){
    console.log("openCloseWeapons");

    laserWeapon1Button.x = buyButton.x + 456;
    laserWeapon1Button.y = buyButton.y + 64;
    bulletWeapon1Button.x = buyButton.x + 283;
    bulletWeapon1Button.y = buyButton.y + 127;
    energyWeapon1Button.x = buyButton.x + 110;
    energyWeapon1Button.y = buyButton.y + 192;

    laserWeapon1Button.setActive(!laserWeapon1Button.active);
    laserWeapon1Button.setVisible(!laserWeapon1Button.visible);

    bulletWeapon1Button.setActive(!bulletWeapon1Button.active);
    bulletWeapon1Button.setVisible(!bulletWeapon1Button.visible);

    energyWeapon1Button.setActive(!energyWeapon1Button.active);
    energyWeapon1Button.setVisible(!energyWeapon1Button.visible);

    if(laserWeapon1Button.active) weaponMenuOpen = true;
}  

function keyPlaceTurret(turret, player){
    console.log("keyPlaceTurret");
    console.log("menuOpenX: " + menuOpenX);
    console.log("menuOpenY: " + menuOpenY);
    
    if(canPlaceTurretLeft(menuOpenX, menuOpenY, 20, 10)) {
        console.log("placing turret");

        if(turret){
            turret.setActive(true);
            turret.setVisible(true);
            turret.setSide('left');
            turret.placeLeft(menuOpenX, menuOpenY, leftMap);
            player.addMoney(-turret.getCost());
            player.addEnergy(-turret.getEnergy());
            console.log("placed");

        }
        openCloseMenu();
    }
    updateCosts();
}

function clickPlaceTurret(turret, player){
    console.log("clickPlaceTurret");
    console.log("menuOpenX: " + menuOpenX);
    console.log("menuOpenY: " + menuOpenY);
    
    if(canPlaceTurretRight(menuOpenX, menuOpenY, 20, 10)) {
        console.log("placing turret");

        if(turret){
            turret.setActive(true);
            turret.setVisible(true);
            turret.setSide('right');
            turret.placeRight(menuOpenX, menuOpenY, rightMap);
            player.addMoney(-turret.getCost());
            player.addEnergy(-turret.getEnergy());
            console.log("placed");

        }
        openCloseMenu();
    }
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

function sellTurret(x,y,map){
    console.log("Sell turret");
    if(map[menuOpenX][menuOpenY]===1){
        console.log("Selling");
        let turret = turrets.getChildren();
        let energyTurret = energyTurrets.getChildren();
        for(var i=0; i<turret.length; i++){
            if(turret[i].getCoordX() === menuOpenX && turret[i].getCoordY() === menuOpenY){
                if(map === rightMap) secondPlayer.money+=turret[i].getCost()/2;
                else firstPlayer.money+=turret[i].getCost()/2;
                map[menuOpenX][menuOpenY]=0; 
                turret[i].destroy();
                openCloseMenu(x,y);
            } else if(energyTurret[i].getCoordX() === menuOpenX && energyTurret[i].getCoordY() === menuOpenY){
                if(map === rightMap) secondPlayer.money+=turret[i].getCost()/2;
                else firstPlayer.money+=turret[i].getCost()/2;
                map[menuOpenX][menuOpenY]=0; 
                energyTurret[i].destroy();
                openCloseMenu(x,y);
            }
        } 
    }
}



export default LevelPath;