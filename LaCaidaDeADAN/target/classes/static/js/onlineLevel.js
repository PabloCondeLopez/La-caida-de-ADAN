import Bullet from './bullet.js';
import TurretEnemy from './turretEnemy.js';
import Nucleus from './nucleus.js';
import SkellyEnemy from './skellyEnemy.js';
import Turret from './turret.js';
import Player from './player.js';
import EnergyTurret from './energyTurret.js';


var leftMap = [
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
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
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];


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
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];


let turretArray;
let input;
let self;

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

		Phaser.Scene.call(this, { key: 'Level' })

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
		self = this;
		
		this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'map').setScale(0.2);
		selectImage = this.add.image(keyPosX * 64 + 32, keyPosY * 64 + 32, 'select').setScale(3);
		//adan = this.physics.add.image(this.screenWidth/2, this.screenHeight/2 - 32, 'adan').setScale(0.15);
		nucleus.adan = this.physics.add.image(this.screenWidth / 2, this.screenHeight / 2 - 32, 'adan').setScale(0.15);
		//nucleus.addHPBar(this);

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
		//this.secondPlayerHPText = this.add.text((this.screenWidth/2) + 128, 16, 'Vida: ' + firstPlayer.getMaxHp(), {fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled'}).setStroke('#000', 4);
		let secondPlayerEnergyImage = this.add.image(this.screenWidth - 50, this.screenHeight - 53, 'energy').setScale(0.8);
		this.secondPlayerEnergyText = this.add.text(this.screenWidth - 152, this.screenHeight - 85, secondPlayer.getEnergy(), { fontSize: '30px', fill: '#fff', fontFamily: 'Pixeled' }).setStroke('#000', 4);

		this.adanHPText = this.add.text((this.screenWidth / 2) - 256, 16, 'Vida: ' + nucleus.getMaxHp(), { fontSize: '20px', fill: '#fff', fontFamily: 'Pixeled' }).setStroke('#000', 4);

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

	handleMessage(message) {
		if(message.data === "p1Disconnected" || message.data === "p2Disconnected"){
			self.endGame();
			return;
		}
		
		const jsonMsg = JSON.parse(message.data);
		
		if (jsonMsg.info === "enemy") {
			self.handleEnemyCreation(jsonMsg.enemy, jsonMsg.side);
		} else if (jsonMsg.info === "build") {
			console.log("TO DO - handleBuildTurretWS()");
		} else if (jsonMsg.info === "upgrade") {
			console.log("TO DO - handleUpgradeTurretWS()");
		} else if (jsonMsg.info === "sell") {
			console.log("TO DO - handleSellTurretWS()");
		}
	}

	getBullets() {
		return bullets;
	}

	update(time, delta) {
		if(playerID === 2) return;

		nucleus.update(time, delta);

		this.firstPlayerMoneyText.setText(firstPlayer.getMoney());
		this.firstPlayerEnergyText.setText(firstPlayer.getEnergy());

		this.secondPlayerMoneyText.setText(secondPlayer.getMoney());
		//this.secondPlayerHPText.setText("Vida: " + secondPlayer.getCurrentHP());
		this.secondPlayerEnergyText.setText(secondPlayer.getEnergy());

		this.adanHPText.setText("Vida: " + nucleus.getCurrentHP());

		let tur = turrets.getChildren().concat(energyTurrets.getChildren());
		for (var p = 0; p < tur.length; p++) {
			if (tur[p].x === 0) {
				tur[p].destroy();
			}
		}

		if (levelPaused) {
			levelPaused = false;

			if (!this.pauseOnScene) {
				this.scene.launch('PauseMenu');
				this.pauseOnScene = true;
			} else {
				this.scene.wake('PauseMenu');
			}

			this.scene.pause();
		}

		if (nucleus.getCurrentHP() <= 0) {
			this.endGame();
		}

		if (time > this.nextEnemy) {
			enemyHP *= 1.05;
			let x = Math.random();
			let y = Math.random();
			let leftEnemy;
			if (x <= 0.5) {
				leftEnemy = leftEnemies1.get();
			}
			else {
				leftEnemy = leftEnemies2.get();
			}

			let leftEnemyInfo = {
				info: "enemy",
				enemy: leftEnemy.getType(),
				side: "left"
			}

			echoHandler.send(JSON.stringify(leftEnemyInfo));

			let rightEnemy;
			if (y < 0.5) {
				rightEnemy = rightEnemies1.get();
			}
			else {
				rightEnemy = rightEnemies2.get();
			}

			if (leftEnemy) {
				leftEnemy.setMaxHP(enemyHP);
				leftEnemy.setActive(true);
				leftEnemy.setVisible(true);

				leftEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
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

	addBullet(x, y, angle) {
		let bullet = bullets.get();

		if (bullet) {
			bullet.fire(x, y, angle);
		}
	}

	addEnemyBullet(x, y, angle) {
		let bullet = enemyBullets.get();

		if (bullet) {
			bullet.fire(x, y, angle);
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
		this.scene.launch('GameOver');
		this.scene.pause();
	}
	
	handleEnemyCreation(enemy, side) {
		let createEnemy;
		
		if (enemy === "skelly" && side === "right") {
			createEnemy = rightEnemies2.get();
			createEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
		} else if (enemy === "range" && side === "rigt"){
			createEnemy = rightEnemies1.get();
			createEnemy.startOnPath(rightPath, firstPlayer, secondPlayer);
		} else if (enemy === "skelly" && side === "left") {
			createEnemy = leftEnemies2.get();
			createEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
		} else if (enemy === "range" && side === "left") {
			createEnemy = leftEnemies1.get();
			createEnemy.startOnPath(leftPath, secondPlayer, firstPlayer);
		}
		
		createEnemy.setVisible(true);
		createEnemy.setActive(true);
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
	}
}

function damagePlayer(adan, bullet) {
	if (bullet.active === true && adan.active === true) {
		bullet.setActive(false);
		bullet.setVisible(false);
		nucleus.takeDamage(bullet.getDamage());
	}
}

function onRightClick(pointer) {
	let i = Math.floor(pointer.y / 64);
	let j = Math.floor(pointer.x / 64);

	if (rightMap[i][j % 16] !== -1 && rightMap[i][j % 16] !== undefined) openCloseMenu(i, j, false);
	else if (i === menuRightOpenX + 1 && j % 16 === menuRightOpenY - 1 && buyMenuRightOpen) openCloseWeapons(false);
	else if (i === menuRightOpenX + 2 && j % 16 === menuRightOpenY - 1 && weaponMenuRightOpen) PlaceLaserTurret(false);
	else if (i === menuRightOpenX + 3 && j % 16 === menuRightOpenY - 1 && weaponMenuRightOpen) PlaceEnergyTurret(false);
	else if (i === menuRightOpenX + 1 && j % 16 === menuRightOpenY + 1 && buyMenuRightOpen) sellTurret(i, j, rightMap, menuRightOpenX, menuRightOpenY);
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

function keyPlaceTurret(turret, player) {

	if (canPlaceTurretLeft(menuLeftOpenX, menuLeftOpenY, turret.cost, turret.energy)) {
		if (turret) {
			turret.setActive(true);
			turret.setVisible(true);
			turret.setSide('left');
			turret.placeLeft(menuLeftOpenX, menuLeftOpenY, leftMap);
			player.addMoney(-turret.getCost());
			player.addEnergy(-turret.getEnergy());
		}

		openCloseMenu(menuLeftOpenX, menuLeftOpenY, true);
	}

	updateCosts(secondPlayer);
}

function clickPlaceTurret(turret, player) {

	if (canPlaceTurretRight(menuRightOpenX, menuRightOpenY, turret.cost, turret.energy)) {

		if (turret) {
			turret.setActive(true);
			turret.setVisible(true);
			turret.setSide('right');
			turret.placeRight(menuRightOpenX, menuRightOpenY, rightMap);
			player.addMoney(-turret.getCost());
			player.addEnergy(-turret.getEnergy());

			let turretInfo = {
				type: turret.getType(),
				posX: menuRightOpenX,
				posY: menuRightOpenY,
				cost: turret.getCost(),
				energy: turret.getEnergy(),
			}

			echoHandler.send(JSON.stringify(turretInfo));
		}
		openCloseMenu(menuLeftOpenX, menuLeftOpenY, true);
	}
	updateCosts();
}

function PlaceLaserTurret(isKeyOrClick) {
	let turret = turrets.get();

	if (isKeyOrClick === true) {
		keyPlaceTurret(turret, firstPlayer);
	}
	else {
		clickPlaceTurret(turret, secondPlayer);
	}
}

function PlaceEnergyTurret(isKeyOrClick) {
	let turret = energyTurrets.get();

	if (isKeyOrClick === true) {
		keyPlaceTurret(turret, firstPlayer);
	}
	else {
		clickPlaceTurret(turret, secondPlayer);
	}
}

function updateCosts() {
	let turret = turrets.get();
	if (secondPlayer.money < turret.getCost()) laserWeapon1Button.setTint(0x808080);
	else laserWeapon1Button.clearTint();

	let energyTurret = energyTurrets.get();
	if (secondPlayer.money < energyTurret.getCost()) bulletWeapon1Button.setTint(0x808080);
	else bulletWeapon1Button.clearTint();
}

function sellTurret(x, y, map, menuX, menuY) {

	if (map[menuX][menuY] === 1) {
		let turret = turrets.getChildren();
		let energyTurret = energyTurrets.getChildren();
		for (var i = 0; i < turret.length; i++) {
			if (turret[i].getCoordX() === menuX && turret[i].getCoordY() === menuY) {

				if (map === rightMap) {
					secondPlayer.money += turret[i].getCost() / 2;
					secondPlayer.energy += turret[i].energy;
					updateCosts(secondPlayer);
				} else {
					firstPlayer.money += turret[i].getCost() / 2;
					firstPlayer.energy += turret[i].energy;
					updateCosts(firstPlayer);
				}
				map[menuX][menuY] = 0;
				turret[i].destroy();
				if (menuX === menuLeftOpenX) openCloseMenu(x, y, true);
				else openCloseMenu(x, y, false);

			} else if (energyTurret[i].getCoordX() === menuX && energyTurret[i].getCoordY() === menuY) {

				if (map === rightMap) {
					secondPlayer.money += energyTurret[i].getCost() / 2;
					secondPlayer.energy += energyTurret[i].getEnergy();
					updateCosts(secondPlayer);
				} else {
					firstPlayer.money += energyTurret[i].getCost() / 2;
					firstPlayer.energy += energyTurret[i].getEnergy();
					updateCosts(firstPlayer);
				}
				map[menuX][menuY] = 0;
				energyTurret[i].destroy();
				if (menuX === menuLeftOpenX) openCloseMenu(x, y, true);
				else openCloseMenu(x, y, false);
			}
		}
	}
}

export default OnlineLevel;