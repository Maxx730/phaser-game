export default class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.add.existing(this)

        this.directions = ['UP','DOWN','LEFT','RIGHT'];

        this._scene = scene;
        this.last = scene.time.now;

        let IdleAnimation = {
            key: 'slime-idle',
            frames: scene.anims.generateFrameNumbers('Slime',{start: 0, end: 2}),
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
        this.anims.play('slime-forward');
    }

    randomizeDirection() {
        if(this.scene.time.now - this.last === 5000) {
            this.last = this.scene.time.now;
            console.log(this.directions[Math.ceil(Math.random(0,this.directions.length))])
        }
    }
}