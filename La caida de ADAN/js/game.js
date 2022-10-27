let path;

function preload(){

}

function create() {
    
}

function update() {
        
}

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);