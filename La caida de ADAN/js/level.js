class Level extends Phaser.GameObjects.Image {

    constructor (num) {

        this.level = 0;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'firstMap');

        // interfaz general
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'interface');

        // texto
        this.energiaP1 = game.add.text(100,50,"Energia 1",{
            font: 'Agency FB',
            fontSize: 32,
            fill: 'purple'
        });

        this.energiaP2 = game.add.text(100,50,"Energia 2",{
            font: 'Agency FB',
            fontSize: 32,
            fill: 'purple'
        });

    }

    onStart(){
        player1.onStart();
        player2.onStart();
    }

    updateEnergy(){                             // actualizar el texto
        this.energiaP1.text = player1.energy;
        this.energiaP2.text = player2.energy;
    }

    updateSkills(){
        for(i=0; i<= player1.skills.length; i++){   // si las habilidades no estan habilitadas las pone en rojo (invisibles de momento)
            if(player1.skills[i]) player1.skills[i].button.visible = false;
            else player1.skills[i].button.visible = true;
        }
        for(i=0; i<= player2.skills.length; i++){
            if(player2.skills[i]) player2.skills[i].button.visible = false;
            else player2.skills[i].button.visible = true;
        }
    }


}