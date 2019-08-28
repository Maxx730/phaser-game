
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);
		this.setDrag(200);

        this.scene = scene;
		this.SPEED = 45;
		this.ATTACKING = false;
		this.DIRECTION = 'down';

		if(config.dialog) {
			this.dialog = config.dialog
		}

		//Create the player control key bindings and add event listeners
		this.keys = scene.input.keyboard.addKeys({
			up:Phaser.Input.Keyboard.KeyCodes.W,
			down:Phaser.Input.Keyboard.KeyCodes.S,
			left:Phaser.Input.Keyboard.KeyCodes.A,
			right:Phaser.Input.Keyboard.KeyCodes.D
		})

		this.keys.up.on('down',function(event) {
			if(this.dialog && !this.dialog.IS_OPEN) {
				this.anims.play('walk-up');
				this.DIRECTION = 'up';
			}
		},this);

		this.keys.down.on('down',function(event) {
			if(this.dialog && !this.dialog.IS_OPEN) {
				this.anims.play('walk-down');
				this.DIRECTION= 'down';
			}
		},this);

		this.keys.right.on('down',function(event) {
			if(this.dialog && !this.dialog.IS_OPEN) {
				this.flipX = true;
				this.anims.play('walk-right');
				this.DIRECTION = 'right';
			}
		},this);

		this.keys.left.on('down',function(event) {
			if(this.dialog && !this.dialog.IS_OPEN) {
				this.anims.play('walk-right');
				this.flipX = false;
				this.DIRECTION = 'left';
			}
		},this);

		this.keys.down.on('up',function() {
			if(!this.keys.up.isDown && !this.keys.left.isDown && !this.keys.right.isDown){
				this.anims.play('idle');
				this.flipX = false;
				this.DIRECTION = 'down';
			}

			if(this.keys.left.isDown) {
				this.anims.play('walk-right');
			}

			if(this.keys.right.isDown) {
				this.anims.play('walk-right');
				this.flipX = true
			}
		},this)

		this.keys.right.on('up',function() {
			if(!this.keys.down.isDown && !this.keys.up.isDown && !this.keys.left.isDown){
				this.anims.stop();
				this.flipX = false;
				this.DIRECTION = 'right';
			}
			
			if(this.keys.down.isDown) {
				this.anims.play('walk-down');
			}

			if(this.keys.up.isDown) {
				this.anims.play('walk-up');
			}
		},this)

		this.keys.up.on('up',function() {
			if(!this.keys.down.isDown && !this.keys.left.isDown && !this.keys.right.isDown){
				this.anims.stop();
				this.flipX = false;
				this.DIRECTION = 'up';
			}

			if(this.keys.left.isDown) {
				this.anims.play('walk-right');
			}

			if(this.keys.right.isDown) {
				this.anims.play('walk-right');
				this.flipX = true
			}
		},this)

		this.keys.left.on('up',function() {
			if(!this.keys.up.isDown && !this.keys.down.isDown && !this.keys.right.isDown){
				this.anims.stop();
				this.DIRECTION = 'left';
			}

			if(this.keys.down.isDown) {
				this.anims.play('walk-down');
			}

			if(this.keys.up.isDown) {
				this.anims.play('walk-up');
			}
		},this);

        //INITIALIZE THE PLAYER ANIMATIONS HERE.
        let IdleAnimation = {
            key: 'idle',
            frames: [
                {
                    key: 'Player',
                    frame: 0,
                    duration: 640
                }
            ],//scene.anims.generateFrameNumbers('Player',{start: 0, end: 2}),
            frameRate: 60,
            yoyo: true,
            repeat: -1
        }

        let WalkDownAnimation = {
            key: 'walk-down',
            frames: [
                {
                    key: 'Player',
                    frame: 0
                },
                {
                    key: 'Player',
                    frame: 1
                },
                {
                    key: 'Player',
                    frame: 2
                }
            ],
            frameRate: 6,
            repeat: -1
        }

        let WalkRightAnimation = {
            key: 'walk-right',
            frames: [
                {
                    key: 'Player',
                    frame: 3,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 4,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 5,
                    duration: 100
				}
            ],
            repeat: -1
        }

        let WalkUpAnimation = {
            key: 'walk-up',
            frames: [
                {
                    key: 'Player',
                    frame: 6,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 7,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 8,
                    duration: 100
                }
            ],
            repeat: -1
        }


		//Create a load all the needed animations
        scene.anims.create(IdleAnimation);
        scene.anims.create(WalkDownAnimation);
        scene.anims.create(WalkRightAnimation);
		scene.anims.create(WalkUpAnimation);
        this.anims.load('idle');
        this.anims.load('walk-down');
        this.anims.load('walk-right');
		this.anims.load('walk-up');

		this.on('animationcomplete',function(action) {
			if(action.key === 'attack-down' || action.key === 'attack-up' || action.key === 'attack-right') {
				this.ATTACKING = false
				this.anims.play('idle')
			}
		},this)

        scene.cameras.main.startFollow(this,true,0.5,0.5);
    }

    preUpdate(time,delta) {
		super.preUpdate(time,delta);

		if(this.keys.up.isDown) {
			(this.dialog && !this.dialog.IS_OPEN) && this.setVelocityY(-this.SPEED);
		}

		if(this.keys.down.isDown) {
			(this.dialog && !this.dialog.IS_OPEN) && this.setVelocityY(this.SPEED);
		}

		if(this.keys.right.isDown) {
			(this.dialog && !this.dialog.IS_OPEN) && this.setVelocityX(this.SPEED);
		}

		if(this.keys.left.isDown) {
			(this.dialog && !this.dialog.IS_OPEN) && this.setVelocityX(-this.SPEED);
		}
    }
}