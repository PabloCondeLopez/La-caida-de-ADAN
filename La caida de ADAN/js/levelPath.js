import Enemy from './enemy.js'

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
        //path.draw(graphics);

        this.enemies = this.add.group({
            classType: Enemy,
            runChildUpdate: true
        })

        this.nextEnemy = 0;
        this.enemyInScene = new Array();
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
}

export default LevelPath;