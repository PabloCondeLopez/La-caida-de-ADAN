class Player {
    constructor(maxHp){
        this.maxHp = maxHp;

        this.money = 50;
        this.energy = 20;
        this.currentHp = this.maxHp;
    }

    addMoney(ammount){
        this.money += ammount;
    }

    setMoney(money){
        this.money = money
    }

    getMoney() {
        return this.money;
    }

    getMaxHp(){
        return this.maxHp;
    }

    setHP(hp){
        this.currentHp = hp;
    }
    
    getCurrentHP() {
        return this.currentHp;
    }

    takeDamage(ammount) {
        this.currentHp -= ammount;
        if(this.currentHp < 0) this.currentHp = 0;
    }

    addEnergy(amount){
        this.energy+=amount;
    }

    setEnergy(energy){
        this.energy = energy;
    }
    
    getEnergy(){
        return this.energy;
    }
}

export default Player;