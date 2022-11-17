class Level extends Phaser.GameObjects.Image {

    constructor (num) {

        this.level = 0;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'firstMap');

        // interfaz general
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'interface');

        // skills
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'skill1');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'skill2');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'skill3');

        // texto
        game.add.text(100,50,"Energia 1",{
            font: 'Agency FB',
            fontSize: 32,
            fill: 'purple'
        });

        game.add.text(100,50,"Energia 2",{
            font: 'Agency FB',
            fontSize: 32,
            fill: 'purple'
        });

    }

    updateEnergy(){
        
    }




}