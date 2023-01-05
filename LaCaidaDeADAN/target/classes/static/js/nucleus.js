class Nucleus {
    constructor(maxHp){
        this.maxHp = maxHp;
        this.currentHp = this.maxHp;

        this.damageTimer = 100;
        this.deltaDamage = 0;

        this.adan = undefined;

        this.hpBar = undefined;
    }

    getMaxHp(){
        return this.maxHp;
    }

    addHPBar(scene){
        /*
        this.hpBar = scene.add.graphics();
        this.hpBar.fillStyle(255, 1);
        this.hpBar.fillRect(this.adan.x - 75, this.adan.y -120, 150, 10);
        */
    }

    setCurrentHP(hp){
        this.currentHp=hp;
    }
 
    getCurrentHP() {
        return this.currentHp;
    }

    takeDamage(damage){
        //this.hpBar.setScale(1 - (1 - (this.currentHP/this.maxHP)) - (damage/this.maxHP), 1);
        this.currentHp -= damage;
        if(this.adan!=undefined){
            this.adan.setTint(0xff0000);
            this.deltaDamage = this.damageTimer;
        }
    }

    update (time, delta) {
        this.deltaDamage -= delta;
        if(this.deltaDamage<=0 && this.adan!=undefined) this.adan.clearTint();
    }
    

}

export default Nucleus;