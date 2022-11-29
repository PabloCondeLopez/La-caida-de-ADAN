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

    getMoney() {
        return this.money;
    }

    getMaxHp(){
        return this.maxHp;
    }

    getCurrentHP() {
        return this.currentHp;
    }

    takeDamage(ammount) {
        this.currentHp -= ammount;
    }

    addEnergy(amount){
        this.energy+=amount;
    }
    
    getEnergy(){
        return this.energy;
    }
}

export default Player;