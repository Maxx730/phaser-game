export default class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this)

        this.directions = ['UP','DOWN','LEFT','RIGHT'];
        this.setSize(16,16,true)
        this._scene = scene;
        this.last = scene.time.now;

        let IdleAnimation = {
            key: 'slime-idle',
            frames: [
                {
                    key: 'Slime',
                    frame: 0,
                    duration: 640
                },                {
                    key: 'Slime',
                    frame: 1,
                    duration: 80
                },                {
                    key: 'Slime',
                    frame: 2,
                    duration: 640
                }
            ],
            frameRate: 3,
            yoyo: true,
            repeat: -1
        }

        let UpAnimation = {
            key: 'slime-up',
            frames: scene.anims.generateFrameNumbers('Slime',{start: 4, end: 6}),
            frameRate: 3,
            yoyo: true,
            repeat: -1
        }

        let FowardAnimation = {
            key: 'slime-forward',
            frames: scene.anims.generateFrameNumbers('Slime',{start: 8, end: 11}),
            frameRate: 3,
            yoyo: true,
            repeat: -1
        }

        this._scene.anims.create(IdleAnimation);
        this._scene.anims.create(UpAnimation);
        this._scene.anims.create(FowardAnimation);
        this.anims.load('slime-forward');
        this.anims.load('slime-up');
        this.anims.load('slime-idle');
        this.anims.play('slime-idle');
    }

    randomizeDirection() {
        if(this.scene.time.now - this.last === 5000) {
            this.last = this.scene.time.now;
            console.log(this.directions[Math.ceil(Math.random(0,this.directions.length))])
        }
    }
}