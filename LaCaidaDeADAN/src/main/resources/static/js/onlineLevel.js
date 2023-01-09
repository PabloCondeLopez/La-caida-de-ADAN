import Bullet from './bullet.js';
import TurretEnemy from './turretEnemy.js';
import SkellyEnemy from './skellyEnemy.js';
import BigBotEnemy from './bigBotEnemy.js';
import GunTurret from './gunTurret.js';
import Player from './player.js';
import EnergyTurret from './energyTurret.js';
import Nucleus from './nucleus.js';


var leftMap =
	[[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];


var rightMap = [
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1],
	[-1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, 0, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];


let turretArray;
let self;

let graphics;
let leftPath;
let rightPath;

let turrets;
let leftEnemies1;
let leftEnemies2;
let leftEnemies3;
let rightEnemies1;
let rightEnemies2;
let rightEnemies3;
let energyTurrets;
let enemyBullets;
let enemyHP = 100;

let bullets;
let input;

let firstPlayer = new Player(100);
let secondPlayer = new Player(100);
let nucleus = new Nucleus(50);

let keyPosX = 0;
let keyPosY = 0;

let selectImage;

let levelPaused = false;

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

class OnlineLevel extends Phaser.Scene {
	constructor(screenWidth, screenHeight) {
		super();

		Phaser.Scene.call(this, { key: 'OnlineLevel' })

		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.SPAWN_SPEED = 4000;

	}

	preload() {
		this.load.image('turret', 'assets/metralleta high-res.png');
        this.load.image('turretUpgrade', 'assets/prueba_mejora.png');
        this.load.image('enemy', 'assets/pixil-frame-0.png');
        this.load.image('deadEnemy', 'assets/basic robot dead.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('map', 'assets/Nivel 1 oscuras.png');
        this.load.image('select', 'assets/select.png');
        this.load.image('energyTurret', 'assets/energia.png');
        this.load.image('skelly', 'assets/skelly.png');
        this.load.spritesheet('adan', 'assets/nucleo.png', {frameWidth: 192, frameHeight: 320 });

        this.load.spritesheet('enemyWalkin', 'assets/turretRobot.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bigRobot', 'assets/Robotitan spritesheet final.png', { frameWidth: 64, frameHeight: 120 });
        this.load.spritesheet('skellyBot', 'assets/squelebot stripe.png', {frameWidth: 64, frameHeight: 80});

        // botones
        this.load.image('square', 'assets/cuadrado.png');
        this.load.image('storeIcons', 'assets/iconos_tienda.png');

        // Sonidos
        this.load.audio('shoot', 'assets/turret_shoot.mp3');
        this.load.audio('musicote rave', 'assets/musicote.wav');

        this.load.image('energy', 'assets/energy.png');
        this.load.image('coin', 'assets/coin.png');
	}

	create() {
		self = this;
		
		this.SPAWN_SPEED = 4000;
        enemyHP = 1.05;

		this.sound.play('musicote rave', {volume: 0.1, loop:true});
        this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map');
        selectImage = this.add.image(keyPosX * 64 + 32, keyPosY * 64 + 32, 'select').setScale(3);
        nucleus.adan = this.physics.add.sprite(this.screenWidth / 2 - 2, this.screenHeight / 2 - 94, 'adan');
        
        graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1);

		leftPath = this.add.path(0, cellSize * 3.5);
		leftPath.lineTo(cellSize * 3.5, cellSize * 3.5);
		leftPath.lineTo(cellSize * 3.5, cellSize * 10.5);
		leftPath.lineTo(cellSize * 9.5, cellSize * 10.5);
		leftPath.lineTo(cellSize * 9.5, cellSize * 6.5);
		leftPath.lineTo(cellSize * 12.75, cellSize * 6.5);

		//leftPath.draw(graphics);
		//this.drawLeftGrid();

		rightPath = this.add.path(this.screenWidth, cellSize * 3.5);
		rightPath.lineTo(this.screenWidth - cellSize * 3.5, cellSize * 3.5);
		rightPath.lineTo(this.screenWidth - cellSize * 3.5, cellSize * 10.5);
		rightPath.lineTo(this.screenWidth - cellSize * 9.5, cellSize * 10.5);
		rightPath.lineTo(this.screenWidth - cellSize * 9.5, cellSize * 6.5);
		rightPath.lineTo(this.screenWidth - cellSize * 12.75, cellSize * 6.5);

		//rightPath.draw(graphics);
		//this.drawRightGrid();

		this.firstPlayerMoneyText = this.add.text(90, 13, '50', { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled' }).setStroke('#000', 4);
        let firstPlayerMoneyImage = this.add.image(50, 50, 'coin').setScale(0.08);
        let firstPlayerEnergyImage = this.add.image(50, this.screenHeight - 50, 'energy').setScale(0.8);
        this.firstPlayerEnergyText = this.add.text(90, this.screenHeight - 85, firstPlayer.getEnergy(), { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled' }).setStroke('#000', 4);

        this.secondPlayerMoneyText = this.add.text(this.screenWidth - 152, 13, '50', { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled' }).setStroke('#000', 4);
        let secondPlayerMoneyImage = this.add.image(this.screenWidth - 50, 50, 'coin').setScale(0.08);
        let secondPlayerEnergyImage = this.add.image(this.screenWidth - 50, this.screenHeight - 53, 'energy').setScale(0.8);
        this.secondPlayerEnergyText = this.add.text(this.screenWidth - 152, this.screenHeight - 85, secondPlayer.getEnergy(), { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled' }).setStroke('#000', 4);

		leftEnemies1 = this.physics.add.group({
            classType: TurretEnemy,
            runChildUpdate: true
        });

        leftEnemies2 = this.physics.add.group({
            classType: SkellyEnemy,
            runChildUpdate: true
        });

        leftEnemies3 = this.physics.add.group({
            classType: BigBotEnemy,
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

        rightEnemies3 = this.physics.add.group({
            classType: BigBotEnemy,
            runChildUpdate: true
        });

        energyTurrets = this.add.group({
            classType: EnergyTurret,
            runChildUpdate: true
        })

        turrets = this.add.group({
            classType: GunTurret,
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
        this.physics.add.overlap(leftEnemies3, bullets, damageEnemy);

        this.physics.add.overlap(rightEnemies1, bullets, damageEnemy);
        this.physics.add.overlap(rightEnemies2, bullets, damageEnemy);
        this.physics.add.overlap(rightEnemies3, bullets, damageEnemy);

		this.physics.add.overlap(enemyBullets, nucleus.adan, damagePlayer);

		this.nextEnemy = 0;
		this.pauseOnScene = false;

		this.input.on('pointerdown', this.onClickHandler);

		nucleus.setCurrentHP(nucleus.getMaxHp());

		firstPlayer.setEnergy(20);
		secondPlayer.setEnergy(20);

		firstPlayer.setMoney(50);
		secondPlayer.setMoney(50);

		this.resetMap();

		// botones tienda
		input = this.input;

		//TIENDA DERECHA
		buyButton = this.add.image(1000, 200, 'storeIcons').setCrop(288 * 8, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        buyButton.setInteractive();

        upgradeButton = this.add.image(1000 - 50 * 3, 200, 'storeIcons').setCrop(288 * 9, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        upgradeButton.setInteractive();

        sellButton = this.add.image(1000 - 50 * 6, 200, 'storeIcons').setCrop(288 * 10, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        sellButton.setInteractive();


		//ARMAS
        laserWeapon1Button = this.add.image(1000, 200, 'storeIcons').setCrop(0, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        laserWeapon1Button.setInteractive();

        bulletWeapon1Button = this.add.image(1000 - 50 * 3, 200, 'storeIcons').setCrop(288 * 3, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        bulletWeapon1Button.setInteractive();

        energyWeapon1Button = this.add.image(1000 - 50 * 6, 200, 'storeIcons').setCrop(288 * 6, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false).setTint(0x808080);
        energyWeapon1Button.setInteractive();


		//TIENDA IZQUIERDA
        buyButton1 = this.add.image(1000, 200, 'storeIcons').setCrop(288 * 8, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        buyButton1.setInteractive();

        upgradeButton1 = this.add.image(1000 - 50 * 3, 200, 'storeIcons').setCrop(288 * 9, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        upgradeButton1.setInteractive();

        sellButton1 = this.add.image(1000 - 50 * 6, 200, 'storeIcons').setCrop(288 * 10, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        sellButton1.setInteractive();


		//ARMAS
        laserWeapon1Button1 = this.add.image(1000, 200, 'storeIcons').setCrop(0, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        laserWeapon1Button1.setInteractive();

        bulletWeapon1Button1 = this.add.image(1000 - 50 * 3, 200, 'storeIcons').setCrop(288 * 3, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false);
        bulletWeapon1Button1.setInteractive();

        energyWeapon1Button1 = this.add.image(1000 - 50 * 6, 200, 'storeIcons').setCrop(288 * 6, 0, 288, 288).setScale(0.2).setActive(false).setVisible(false).setTint(0x808080);
        energyWeapon1Button1.setInteractive();

		echoHandler.onmessage = this.handleMessage;
		echoHandler.onclose = this.handlePlayerDisconnect;

	}

	handleEnemyCreation(enemy, side) {
		let createEnemy;
		
		if (enemy === "skelly" && side === "right") {
			createEnemy = rightEnemies2.get();
			createEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
		} else if (enemy === "range" && side === "right"){
			createEnemy = rightEnemies1.get();
			createEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
		} else if (enemy === "big" && side === "right"){
			createEnemy = rightEnemies3.get();
			createEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
		}  else if (enemy === "skelly" && side === "left") {
			createEnemy = leftEnemies2.get();
			createEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
		} else if (enemy === "range" && side === "left") {
			createEnemy = leftEnemies1.get();
			createEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
		} else if (enemy === "big" && side === "left") {
			createEnemy = leftEnemies3.get();
			createEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
		} else {
			console.log("Error. Enemy: " + enemy + ", side: " + side);
		}
		
		if(createEnemy != null) {
			createEnemy.setVisible(true);
			createEnemy.setActive(true);
		}
	}
	
	handleBuildTurretWS(turret, side, cost, energy, x, y) {
		let createTurret;

		if(turret === 'normal'){
			createTurret = turrets.get();
		} else if (turret === 'energy'){
			createTurret = energyTurrets.get();
		}
		
		createTurret.setActive(true);
		createTurret.setVisible(true);
		createTurret.setSide(side);
		createTurret.setUpgradeImage('turretUpgrade');
		
		if(createTurret.side === "right") {
			createTurret.placeRight(x, y, rightMap);
			firstPlayer.addMoney(-cost);
			firstPlayer.addEnergy(-energy);
		}
		else if (createTurret.side === "left") {
			createTurret.placeLeft(x, y, leftMap);
			secondPlayer.addMoney(-cost);
			secondPlayer.addEnergy(-energy);
		}
		
	}
	
	handleSellTurretWS(index, type, x, y) {
		let normalTurretsChildren;
		let energyTurretsChildren;
		
		if(type === 'normal')
			normalTurretsChildren = turrets.getChildren();
		else if (type === 'energy')
			energyTurretsChildren = energyTurrets.getChildren();
		
		console.log(index);
		console.log(normalTurretsChildren);
			
		if(normalTurretsChildren != null)
			normalTurretsChildren[index].destroy();
		
		if(energyTurretsChildren != null)
			energyTurretsChildren[index].destroy();
			
		if(playerID === 1 && buyMenuLeftOpen === true) openCloseMenu(x, y, true);
		else if (playerID === 2 && buyMenuRightOpen === true) openCloseMenu(x, y, false);
	}
	
	handleUpgradeTurretWS(index, type, x, y) {
		let normalTurretsChildren;
		let energyTurretsChildren;
		let player;
		
		if(playerID === 1) player = firstPlayer;
		else if (playerID === 2) player = secondPlayer;
		
		if(type === 'normal')
			normalTurretsChildren = turrets.getChildren();
		else if (type === 'energy')
			energyTurretsChildren = energyTurrets.getChildren();
			
		if(normalTurretsChildren != null){
			normalTurretsChildren[index].upgradeTurret(self);
			player.addMoney(-normalTurretsChildren[index].getUpgradeCost());
			player.addEnergy(-normalTurretsChildren[index].getUpgradeEnergy());
		}
		
		if(energyTurretsChildren != null) {
			energyTurretsChildren[index].upgradeTurret(self);
			player.addMoney(-energyTurretsChildren[index].getUpgradeCost());
			player.addEnergy(-energyTurretsChildren[index].getUpgradeEnergy());
		}
		
		if(playerID === 1 && buyMenuLeftOpen === true) openCloseMenu(x, y, true);
		else if (playerID === 2 && buyMenuRightOpen === true) openCloseMenu(x, y, false);
	}

	handleMessage(message) {
		if(message.data === "p1Disconnected" || message.data === "p2Disconnected"){
			self.endGame();
			return;
		}
		
		const jsonMsg = JSON.parse(message.data);
		
		if (jsonMsg.info === "enemy") {
			self.handleEnemyCreation(jsonMsg.enemy, jsonMsg.side);
		} else if (jsonMsg.info === "build") {
			self.handleBuildTurretWS(jsonMsg.turret, jsonMsg.side, jsonMsg.cost, jsonMsg.energy, jsonMsg.x, jsonMsg.y);
		} else if (jsonMsg.info === "upgrade") {
			self.handleUpgradeTurretWS(jsonMsg.index, jsonMsg.type, jsonMsg.x, jsonMsg.y);
		} else if (jsonMsg.info === "sell") {
			self.handleSellTurretWS(jsonMsg.index, jsonMsg.type, jsonMsg.x, jsonMsg.y);
		}
	}

	getBullets() {
		return bullets;
	}

	update(time, delta) {
		this.firstPlayerMoneyText.setText(firstPlayer.getMoney());
		this.firstPlayerEnergyText.setText(firstPlayer.getEnergy());

		this.secondPlayerMoneyText.setText(secondPlayer.getMoney());
		this.secondPlayerEnergyText.setText(secondPlayer.getEnergy());
		
		nucleus.update(time, delta);
		
		if(playerID === 2) return;

		let tur = turrets.getChildren().concat(energyTurrets.getChildren());
		for (var p = 0; p < tur.length; p++) {
			if (tur[p].x === 0) {
				tur[p].destroy();
			}
		}

		if (nucleus.getCurrentHP() <= 0) {
			this.endGame();
		}

		if (time > this.nextEnemy) {
			enemyHP *= 1.05;
			let leftEnemy;
			let rightEnemy;
			
			if (this.SPAWN_SPEED > 500) {
                this.SPAWN_SPEED -= 50;
            }
            
            let x = Math.random();
            let y = Math.random();
            
			if (x <= 0.4) {
				leftEnemy = leftEnemies1.get();
				leftEnemy.animateWalk();
			} else if (x <= 0.8) {
				leftEnemy = leftEnemies2.get();
				leftEnemy.animateWalk();
			}
			else {
				leftEnemy = leftEnemies3.get();
				leftEnemy.animateWalk();
			}

			let leftEnemyInfo = {
				info: "enemy",
				enemy: leftEnemy.getType(),
				side: "left"
			}

			echoHandler.send(JSON.stringify(leftEnemyInfo));

			if (y < 0.4) {
				rightEnemy = rightEnemies1.get();
				rightEnemy.animateWalk();
			} else if (y <= 0.8) {
				rightEnemy = rightEnemies2.get();
				rightEnemy.animateWalk();
			} else {
				rightEnemy = rightEnemies3.get();
				rightEnemy.animateWalk();
			}

			if (leftEnemy) {
				leftEnemy.setMaxHP(enemyHP);
				leftEnemy.setActive(true);
				leftEnemy.setVisible(true);

				leftEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
				leftEnemy.flip();
			}

			if (rightEnemy) {
				rightEnemy.setMaxHP(enemyHP);
				rightEnemy.setActive(true);
				rightEnemy.setVisible(true);

				rightEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
			}
			
			let rightEnemyInfo = {
				info: "enemy",
				enemy: rightEnemy.getType(),
				side: 'right'
			}
			
			echoHandler.send(JSON.stringify(rightEnemyInfo));

			this.nextEnemy = time + this.SPAWN_SPEED;
		}

	}

	drawLeftGrid() {
		graphics.lineStyle(1, 0x0000ff, 0.8);

		for (var i = 0; i < 17; i++) {
			graphics.moveTo(0, i * 64);
			graphics.lineTo(this.screenWidth / 2 - 64, i * 64);
		}

		for (var j = 0; j < 12; j++) {
			graphics.moveTo(j * 64, 0);
			graphics.lineTo(j * 64, this.screenHeight);
		}
		graphics.strokePath();

	}

	drawRightGrid() {
		graphics.lineStyle(1, 0x0000ff, 0.8);

		for (var i = 0; i < 17; i++) {
			graphics.moveTo(this.screenWidth, i * 64);
			graphics.lineTo(this.screenWidth / 2 + 64, i * 64);
		}

		for (var j = 0; j < 12; j++) {
			graphics.moveTo(this.screenWidth - j * 64, 0);
			graphics.lineTo(this.screenWidth - j * 64, this.screenHeight);
		}
		graphics.strokePath();

	}

	onClickHandler(pointer) {

		let i = Math.floor(pointer.y / 64);
		let j;

		if (pointer.x / 64 >= 16) {
			j = Math.floor(((pointer.x - cellSize * 2) / 64) % 14);
		} else {
			j = undefined;
		}

		if (pointer.button === 0) {

			onRightClick(pointer);
		}
	}

	getEnemy(x, y, distance, side) {
		var leftEnemyUnits = leftEnemies1.getChildren().concat(leftEnemies2.getChildren());
		var rightEnemyUnits = rightEnemies1.getChildren().concat(rightEnemies2.getChildren());

		if (side === 'left') {
			for (var i = 0; i < leftEnemyUnits.length; i++) {
				if (leftEnemyUnits[i].active && Phaser.Math.Distance.Between(x, y, leftEnemyUnits[i].x, leftEnemyUnits[i].y) <= distance)
					return leftEnemyUnits[i];
			}
		}
		else if (side === 'right') {
			for (var i = 0; i < rightEnemyUnits.length; i++) {
				if (rightEnemyUnits[i].active && Phaser.Math.Distance.Between(x, y, rightEnemyUnits[i].x, rightEnemyUnits[i].y) <= distance)
					return rightEnemyUnits[i];
			}
		}

		return false;
	}

	addBullet(x, y, angle, damage) {
		let bullet = bullets.get();

		if (bullet) {
			bullet.fire(x, y, angle, damage);
		}
	}

	addEnemyBullet(x, y, angle, damage) {
		let bullet = enemyBullets.get();

		if (bullet) {
			bullet.fire(x, y, angle, damage);
		}
	}

	resetMap() {
		for (var i = 0; i < leftMap.length; i++) {
			for (var j = 0; j < leftMap[i].length; j++) {
				if (leftMap[i][j] === 1) leftMap[i][j] = 0;
			}
		}

		for (var i = 0; i < rightMap.length; i++) {
			for (var j = 0; j < rightMap[i].length; j++) {
				if (rightMap[i][j] === 1) rightMap[i][j] = 0;
			}
		}
	}

	endGame() {
		this.sound.stopAll();
		this.scene.launch('GameOver');
		this.scene.pause();
	}

}

function canPlaceTurretLeft(i, j, turretcost, turretEnergy) {
	var canPlace = false;

	if (firstPlayer.getMoney() >= turretcost && firstPlayer.getEnergy() >= turretEnergy && leftMap[i][j] === 0) {
		canPlace = true;
	}

	return canPlace
}

function canPlaceTurretRight(i, j, turretcost, turretEnergy) {
	var canPlace = false;

	if (secondPlayer.getMoney() >= turretcost && secondPlayer.getEnergy() >= turretEnergy && rightMap[i][j] === 0) {
		canPlace = true;
	}

	return canPlace
}

function damageEnemy(enemy, bullet) {
	if (enemy.active === true && bullet.active === true) {
		enemy.takeDamage(bullet.getDamage(), bullet);
		bullet.setActive(false);
		bullet.setVisible(false);
		
		if(playerID === 1)
			updateCostsLeft();
		else if (playerID === 2)
			updateCostsRight();
	}
}

function damagePlayer(adan, bullet) {
	if (bullet.active === true) {
		bullet.setActive(false);
		bullet.setVisible(false);
		nucleus.takeDamage(bullet.getDamage());
	}
}

function onRightClick(pointer) {
	let i = Math.floor(pointer.y / 64);
	let j = Math.floor(pointer.x / 64);

	if(playerID === 2) {
		if (rightMap[i][j % 16] !== -1 && rightMap[i][j % 16] !== undefined) openCloseMenu(i, j, false);
		else if (i === menuRightOpenX + 1 && j % 16 === menuRightOpenY - 1 && buyMenuRightOpen && rightMap[menuRightOpenX][menuRightOpenY] === 0) openCloseWeapons(false);
		else if (i === menuRightOpenX + 2 && j % 16 === menuRightOpenY - 1 && weaponMenuRightOpen) PlaceLaserTurret(false);
		else if (i === menuRightOpenX + 3 && j % 16 === menuRightOpenY - 1 && weaponMenuRightOpen) PlaceEnergyTurret(false);
		else if (i === menuRightOpenX + 1 && j % 16 === menuRightOpenY + 1 && buyMenuRightOpen) sellTurret(false);
		else if (i === menuRightOpenX + 1 && j % 16 === menuRightOpenY && buyMenuRightOpen) upgradeTurret(false);
	} else if (playerID === 1){
		if (leftMap[i][j] !== -1 && leftMap[i][j] !== undefined) openCloseMenu(i, j, true);
		else if (i === menuLeftOpenX + 1 && j === menuLeftOpenY - 1 && buyMenuLeftOpen && leftMap[menuLeftOpenX][menuLeftOpenY] === 0) openCloseWeapons(true);
		else if (i === menuLeftOpenX + 2 && j === menuLeftOpenY - 1 && weaponMenuLeftOpen) PlaceLaserTurret(true);
		else if (i === menuLeftOpenX + 3 && j === menuLeftOpenY - 1 && weaponMenuLeftOpen) PlaceEnergyTurret(true);
		else if (i === menuLeftOpenX + 1 && j === menuLeftOpenY + 1 && buyMenuLeftOpen) sellTurret(true);
		else if (i === menuLeftOpenX + 1 && j === menuLeftOpenY && buyMenuLeftOpen) upgradeTurret(true);
	}
}


function openCloseMenu(i, j, menu) {

	if (menu === false) {
		menuRightOpenX = i;
		menuRightOpenY = j % 16;

		i *= 64;
		j *= 64;

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

		if (buyButton.active) buyMenuRightOpen = true;
		weaponMenuRightOpen = false;
		updateCostsRight();
	}
	else {
		menuLeftOpenX = i;
		menuLeftOpenY = j;

		i *= 64;
		j *= 64;

		buyButton1.x = j - 200;
		buyButton1.y = i + 96;

		upgradeButton1.x = j - 198;
		upgradeButton1.y = i + 96;

		sellButton1.x = j - 196;
		sellButton1.y = i + 96;

		activeInactive(buyButton1, upgradeButton1, sellButton1);

		if (buyButton1.active) buyMenuLeftOpen = true;

		laserWeapon1Button1.setActive(false);
		laserWeapon1Button1.setVisible(false);

		bulletWeapon1Button1.setActive(false);
		bulletWeapon1Button1.setVisible(false);

		energyWeapon1Button1.setActive(false);
		energyWeapon1Button1.setVisible(false);

		weaponMenuLeftOpen = false;
		updateCostsLeft();
	}

}

function activeInactive(button1, button2, button3) {
	button1.setActive(!button1.active);
	button1.setVisible(!button1.visible);

	button2.setActive(!button2.active);
	button2.setVisible(!button2.visible);

	button3.setActive(!button3.active);
	button3.setVisible(!button3.visible);
}

function openCloseWeapons(menu) {
	if (menu === false) {
		laserWeapon1Button.x = buyButton.x + 456;
		laserWeapon1Button.y = buyButton.y + 64;
		bulletWeapon1Button.x = buyButton.x + 283;
		bulletWeapon1Button.y = buyButton.y + 127;
		energyWeapon1Button.x = buyButton.x + 110;
		energyWeapon1Button.y = buyButton.y + 192;

		activeInactive(laserWeapon1Button, bulletWeapon1Button, energyWeapon1Button);

		if (laserWeapon1Button.active) weaponMenuRightOpen = true;

	} else {
		laserWeapon1Button1.x = buyButton1.x + 456;
		laserWeapon1Button1.y = buyButton1.y + 64;
		bulletWeapon1Button1.x = buyButton1.x + 283;
		bulletWeapon1Button1.y = buyButton1.y + 127;
		energyWeapon1Button1.x = buyButton1.x + 110;
		energyWeapon1Button1.y = buyButton1.y + 192;

		activeInactive(laserWeapon1Button1, bulletWeapon1Button1, energyWeapon1Button1);

		if (laserWeapon1Button1.active) weaponMenuLeftOpen = true;
	}
}

function leftPlaceTurret(turret, player) {
	if (canPlaceTurretLeft(menuLeftOpenX, menuLeftOpenY, turret.cost, turret.energy)) {
		let turretInfo;
		
		if (turret) {
			turret.setActive(true);
			turret.setVisible(true);
			turret.setSide('left');
			turret.placeLeft(menuLeftOpenX, menuLeftOpenY, leftMap);
			player.addMoney(-turret.getCost());
			player.addEnergy(-turret.getEnergy());
			turret.setUpgradeImage('turretUpgrade');
			
			turretInfo = {
				info: "build",
				turret: turret.getType(),
				side: "left",
				cost: turret.getCost(),
				energy: turret.getEnergy(),
				x: menuLeftOpenX,
				y: menuLeftOpenY
			};
			
			echoHandler.send(JSON.stringify(turretInfo));
		}

		openCloseMenu(menuLeftOpenX, menuLeftOpenY, true);
	}
}

function rightPlaceTurret(turret, player) {
	if (canPlaceTurretRight(menuRightOpenX, menuRightOpenY, turret.cost, turret.energy)) {
		let turretInfo;

		if (turret) {
			turret.setActive(true);
			turret.setVisible(true);
			turret.setSide('right');
			turret.placeRight(menuRightOpenX, menuRightOpenY, rightMap);
			player.addMoney(-turret.getCost());
			player.addEnergy(-turret.getEnergy());
			turret.setUpgradeImage('turretUpgrade');
			
			turretInfo = {
				info: "build",
				turret: turret.getType(),
				side: "right",
				cost: turret.getCost(),
				energy: turret.getEnergy(),
				x: menuRightOpenX,
				y: menuRightOpenY
			};
			
			echoHandler.send(JSON.stringify(turretInfo));
		}
		openCloseMenu(menuRightOpenX, menuRightOpenY, false);
	}
}

function PlaceLaserTurret(isKeyOrClick) {
	let turret = turrets.get();

	if (isKeyOrClick === true) {
		leftPlaceTurret(turret, firstPlayer);
	}
	else {
		rightPlaceTurret(turret, secondPlayer);
	}
}

function PlaceEnergyTurret(isKeyOrClick) {
	let turret = energyTurrets.get();

	if (isKeyOrClick === true) {
		leftPlaceTurret(turret, firstPlayer);
	}
	else {
		rightPlaceTurret(turret, secondPlayer);
	}
}

function updateCostsRight() {
	let t = turrets.get();
	let eT = energyTurrets.get();
	let ts = turrets.getChildren();
	let eTs = energyTurrets.getChildren();

	if (buyMenuRightOpen) {
		// MENU GENERAL
		if (rightMap[menuRightOpenX][menuRightOpenY] === 0) { buyButton.clearTint(); }
		else { buyButton.setTint(0x808080); }

		// MENU DE ARMAS 
		if (t.getCost() > secondPlayer.money) { laserWeapon1Button.setTint(0x808080); }
		else if (t.getEnergy() > secondPlayer.energy) { laserWeapon1Button.setTint(0x808080); }
		else { laserWeapon1Button.clearTint(); }

		if (eT.getCost() > secondPlayer.money) { bulletWeapon1Button.setTint(0x808080); }
		else { bulletWeapon1Button.clearTint(); }

		// MENU DE MEJORA Y DE VENTA
		if (rightMap[menuRightOpenX][menuRightOpenY] !== 1) {
			sellButton.setTint(0x808080);
			upgradeButton.setTint(0x808080);
		} else {
			sellButton.clearTint();
			upgradeButton.clearTint();
		}

		if (ts != undefined || eTs != undefined) {
			let turret;
			let energyTurret;
			for (let i = 0; i < ts.length; i++) {
				if (ts[i].getCoordX() === menuRightOpenX && ts[i].getCoordY() === menuRightOpenY) {
					turret = ts[i];
				}
			}
			for (let i = 0; i < eTs.length; i++) {
				if (eTs[i].getCoordX() === menuRightOpenX && eTs[i].getCoordY() === menuRightOpenY) {
					energyTurret = eTs[i];
				}
			}
			if (turret != undefined) {
				if (turret.getUpgradeCost() > secondPlayer.money || turret.getMaxLevel() <= turret.getLevel()) { upgradeButton.setTint(0x808080); }
				else { upgradeButton.clearTint(); }
			}
			if (energyTurret != undefined) {
				if (energyTurret.getUpgradeCost() > secondPlayer.money) { upgradeButton.setTint(0x808080); }
				else { upgradeButton.clearTint(); }
			}
		}
	}
}

function updateCostsLeft() {
	let t = turrets.get();
	let eT = energyTurrets.get();
	let ts = turrets.getChildren();
	let eTs = energyTurrets.getChildren();

	if (buyMenuLeftOpen) {
		// MENU GENERAL
		if (leftMap[menuLeftOpenX][menuLeftOpenY] === 0) { buyButton1.clearTint(); }
		else { buyButton1.setTint(0x808080); }

		// MENU DE ARMAS 
		if (t.getCost() > firstPlayer.money) { laserWeapon1Button1.setTint(0x808080); }
		else if (t.getEnergy() > firstPlayer.energy) { laserWeapon1Button1.setTint(0x808080); }
		else { laserWeapon1Button1.clearTint(); }

		if (eT.getCost() > firstPlayer.money) { bulletWeapon1Button1.setTint(0x808080); }
		else { bulletWeapon1Button1.clearTint(); }

		// MENU DE MEJORA Y DE VENTA
		if (leftMap[menuLeftOpenX][menuLeftOpenY] !== 1) {
			sellButton1.setTint(0x808080);
			upgradeButton1.setTint(0x808080);
		} else {
			sellButton1.clearTint();
			upgradeButton1.clearTint();
		}

		if (ts != undefined || eTs != undefined) {
			let turret;
			let energyTurret;
			for (let i = 0; i < ts.length; i++) {
				if (ts[i].getCoordX() === menuLeftOpenX && ts[i].getCoordY() === menuLeftOpenY) {
					turret = ts[i];
				}
			}
			for (let i = 0; i < eTs.length; i++) {
				if (eTs[i].getCoordX() === menuLeftOpenX && eTs[i].getCoordY() === menuLeftOpenY) {
					energyTurret = eTs[i];
				}
			}
			if (turret != undefined) {
				if (turret.getUpgradeCost() > firstPlayer.money || turret.getMaxLevel() <= turret.getLevel()) { upgradeButton1.setTint(0x808080); }
				else { upgradeButton1.clearTint(); }
			}
			if (energyTurret != undefined) {
				if (energyTurret.getUpgradeCost() > firstPlayer.money) { upgradeButton1.setTint(0x808080); }
				else { upgradeButton1.clearTint(); }
			}
		}
	}
}

function upgradeTurret(menu) {
    let menuX;
    let menuY;
    let map;
    let player;
    let turretType;
    let index;
    
    if (menu === false) {
        menuX = menuRightOpenX;
        menuY = menuRightOpenY;
        map = rightMap;
        player = secondPlayer;
    } else {
        menuX = menuLeftOpenX;
        menuY = menuLeftOpenY;
        map = leftMap;
        player = firstPlayer;
    }

    if (map[menuX][menuY] === 1) {
        let turret = turrets.getChildren();
        let energyTurret = energyTurrets.getChildren();

        for (var i = 0; i < turret.length; i++) {
            if (turret[i].getCoordX() === menuX && turret[i].getCoordY() === menuY
                && player.getMoney() >= turret[i].getUpgradeCost() && player.getEnergy() >= turret[i].getUpgradeEnergy()) {
                turret[i].upgradeTurret(this);
                player.money -= turret[i].getUpgradeCost();
                player.energy -= turret[i].getUpgradeEnergy();
                // WEBSOCKETS INFO
                turretType = turret[i].getType();
                index = i;
                // --------------------
                openCloseMenu(menuX, menuY, menu);
            }
        }
        for (var i = 0; i < energyTurret.length; i++) {
            if (energyTurret[i].getCoordX() === menuX && energyTurret[i].getCoordY() === menuY
                && player.getMoney() >= energyTurret[i].getUpgradeCost() && player.getEnergy() >= energyTurret[i].getUpgradeEnergy()) {
                energyTurret[i].upgradeTurret(this);
                player.money -= energyTurret[i].getUpgradeCost();
                player.energy -= energyTurret[i].getUpgradeEnergy();
                // WEBSOCKETS INFO
                turretType = energyTurret[i].getType();
                index = i;
                // -------------------
                openCloseMenu(menuX, menuY, menu);
            }
        }
        
        let upgradeInfo = {
			info: "upgrade",
			index: index,
			type: turretType,
			x: menuX,
			y: menuY
		}
		
		echoHandler.send(JSON.stringify(upgradeInfo));
    }

}

function sellTurret(menu) {
	let menuX;
    let menuY;
    let map;
    let player;
    let index;
    let turretType;
    
    if (menu === false) {
        menuX = menuRightOpenX;
        menuY = menuRightOpenY;
        map = rightMap;
        player = secondPlayer;
    } else {
        menuX = menuLeftOpenX;
        menuY = menuLeftOpenY;
        map = leftMap;
        player = firstPlayer;
    }

	if (map[menuX][menuY] === 1) {
        let turret = turrets.getChildren();
        let energyTurret = energyTurrets.getChildren();

        for (var i = 0; i < turret.length; i++) {
            if (turret[i].getCoordX() === menuX && turret[i].getCoordY() === menuY) {

                player.money += turret[i].getCost() / 2;
                player.energy += turret[i].energy;

                map[menuX][menuY] = 0;
                index = i;
                turretType = turret[i].getType();
                turret[i].destroy();
                openCloseMenu(menuX, menuY, menu);
            }
        }
        for (var i = 0; i < energyTurret.length; i++) {
            if (energyTurret[i].getCoordX() === menuX && energyTurret[i].getCoordY() === menuY) {

                player.money += energyTurret[i].getCost() / 2;
                player.energy += energyTurret[i].getEnergy();

                map[menuX][menuY] = 0;
                index = i;
                turretType = energyTurret[i].getType();
                energyTurret[i].destroy();
                openCloseMenu(menuX, menuY, menu);
            }
        }
		
		let sellInfo = {
			info: "sell",
			index: index,
			type: turretType,
			x: menuX,
			y: menuY,
		}
		
		echoHandler.send(JSON.stringify(sellInfo));
	}
}

export default OnlineLevel;