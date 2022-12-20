class ChatMenu extends Phaser.Scene{
    constructor(gameWidth, gameHeight) {
        super();

        Phaser.Scene.call(this, {key: 'ChatMenu'});

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        console.log("Holi");
    }

    create() {
        console.log("Holi");
        document.getElementById('Chat').style.display = 'block';
    }
}

export default ChatMenu;