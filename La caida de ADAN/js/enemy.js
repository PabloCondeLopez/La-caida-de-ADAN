class Enemy extends Phaser.GameObjects.Image {

    constructor(scene){
        super(scene, 0, 0)

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };
    }

    update (time, delta) {
        const ENEMY_SPEED = 1/10000;
        
        this.follower.t += ENEMY_SPEED * delta;

        this.path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if(this.follower.t >= 1){
            this.setActive(false);
            this.setVisible(false);
        }
    }

    startOnPath(path) {
        this.follower.t = 0;

        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        this.path = path;
    }
}

export default Enemy;