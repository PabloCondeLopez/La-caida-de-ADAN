class MainMenu extends Phaser.Scene {
    constructor () {
        super({key: 'MainMenu'});
    }

    create() {
        let background = this.add.rectangle(640, 360, 1100, 650, 0xffa000, 1);
        let tileText = this.add.text(-280 + 640, 72, 'La caida de ADAN', {fontSize: 72, fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        
        let playButton = this.add.rectangle(640, 240, 1000, 120, 0xffffff, 1);
    }
}

export default MainMenu;