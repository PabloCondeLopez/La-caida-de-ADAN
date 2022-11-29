class BuyMenu extends Phaser.Scene {
    constructor(){
        super();

        Phaser.Scene.call(this, {key: 'BuyMenu'});
    }

    create(){
        let graphics;

        graphics = this.add.graphics({ fillStyle: { color: 0x000000 }} );
        graphics.lineStyle(1, 0x000000f, 1);
        graphics.strokeRoundedRect(100, 100, 40, 80, 5);
        graphics.fillRoundedRect(100, 100, 40, 70, 5);
    }
}

export default BuyMenu;