class Player extends Phaser.GameObjects.Image {

    constructor (id) {

        this.id = id;
        this.energy = 0;
        this.skills;
    }

    onStart(){
        for(i=0; i<this.skills.length; i++){
            this.skills[0].onStart;
        }
    }

}