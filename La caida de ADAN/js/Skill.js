class Skill extends Phaser.GameObjects.Image {

    constructor (rate) {
        this.active = true;
        this.rate = rate;
        let interval;
        this.button = game.add.button(game.world.centerX - 95, 400, 'button', player1.useSkill(0), this, 2, 1, 0);
    }

    onStart(){
        let interval = setInterval(generate(0), skills[0].rate);
    }
    
    useSkill(){
        if(this.active){
            this.ative = false;
            //funcion que realiza
        }
    }

    generate(numSkill){
        this.active = true;
    }

}