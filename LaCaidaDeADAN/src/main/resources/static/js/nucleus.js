class Nucleus {
    constructor(maxHp){
        this.maxHp = maxHp;
        this.currentHp = this.maxHp;

        this.damageTimer = 100;
        this.deltaDamage = 0;

        this.adan = undefined;
    }

    getMaxHp(){
        return this.maxHp;
    }

    setCurrentHP(hp){
        this.currentHp=hp;
    }
 
    getCurrentHP() {
        return this.currentHp;
    }

    takeDamage(damage){
        this.currentHp -= damage;
        console.log(damage);
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