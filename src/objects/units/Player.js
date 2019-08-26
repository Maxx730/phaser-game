import { Scenes } from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setImmovable(true);
        this.setDrag(100);
        this.setSize(10,10);

        this.scene = scene;
		this.SPEED = 45;
		this.ATTACKING = false;
		this.DIRECTION = 'down';

		//Create the player control key bindings and add event listeners
		this.keys = scene.input.keyboard.addKeys({
			up:Phaser.Input.Keyboard.KeyCodes.W,
			down:Phaser.Input.Keyboard.KeyCodes.S,
			left:Phaser.Input.Keyboard.KeyCodes.A,
			right:Phaser.Input.Keyboard.KeyCodes.D
		})

		this.keys.up.on('down',function(event) {
			this.anims.play('walk-up');
			this.DIRECTION = 'up';
		},this);

		this.keys.down.on('down',function(event) {
			this.anims.play('walk-down');
			this.DIRECTION= 'down';
		},this);

		this.keys.right.on('down',function(event) {
			this.flipX = false;
			this.anims.play('walk-right');
			this.DIRECTION = 'right';
		},this);

		this.keys.left.on('down',function(event) {
			this.anims.play('walk-right');
			this.flipX = true;
			this.DIRECTION = 'left';
		},this);

		this.keys.down.on('up',function() {
			if(!this.keys.up.isDown && !this.keys.left.isDown && !this.keys.right.isDown){
				this.anims.play('idle');
				this.flipX = false;
			}
		},this)

		this.keys.right.on('up',function() {
			if(!this.keys.down.isDown && !this.keys.up.isDown && !this.keys.left.isDown){
				this.anims.play('idle');
				this.flipX = false;
			}
		},this)

		this.keys.up.on('up',function() {
			if(!this.keys.down.isDown && !this.keys.left.isDown && !this.keys.right.isDown){
				this.anims.play('idle');
				this.flipX = false;
			}
		},this)

		this.keys.left.on('up',function() {
			if(!this.keys.up.isDown && !this.keys.down.isDown && !this.keys.right.isDown){
				this.anims.play('idle');
				this.flipX = false;
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
                },                {
                    key: 'Player',
                    frame: 1,
                    duration: 80
                },                {
                    key: 'Player',
                    frame: 2,
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
                    frame: 8,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 9,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 10,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 11,
                    duration: 100
                }
            ],
            frameRate: 60,
            repeat: -1
        }

        let WalkRightAnimation = {
            key: 'walk-right',
            frames: [
                {
                    key: 'Player',
                    frame: 12,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 13,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 14,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 15,
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
                    frame: 16,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 17,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 18,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 19,
                    duration: 100
                }
            ],
            repeat: -1
        }

        let PointUpAnimation = {
            key: 'point-up',
            frames: [
                {
                    key: 'Player',
                    frame: 4,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 5,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 6,
                    duration: 100
                }
            ],
            repeat: -1
		}
		
		let AttackDownAnimation = {
            key: 'attack-down',
            frames: [
                {
                    key: 'Player',
                    frame: 20,
                    duration: 50
                },
                {
                    key: 'Player',
                    frame: 21,
                    duration: 50
                },
                {
                    key: 'Player',
                    frame: 22,
                    duration: 50
				},
				{
                    key: 'Player',
                    frame: 23,
                    duration: 50
                }
			]
		}
		
		let AttackUpAnimation = {
            key: 'attack-up',
            frames: [
                {
                    key: 'Player',
                    frame: 28,
                    duration: 50
                },
                {
                    key: 'Player',
                    frame: 29,
                    duration: 50
                },
                {
                    key: 'Player',
                    frame: 30,
                    duration: 50
				},
				{
                    key: 'Player',
                    frame: 31,
                    duration: 50
                }
			]
		}
		
		let AttackRightAnimation = {
            key: 'attack-right',
            frames: [
                {
                    key: 'Player',
                    frame: 24,
                    duration: 50
                },
                {
                    key: 'Player',
                    frame: 25,
                    duration: 50
                },
                {
                    key: 'Player',
                    frame: 26,
                    duration: 50
				},
				{
                    key: 'Player',
                    frame: 27,
					duration: 50
				}
			]
        }

		//Create a load all the needed animations
        scene.anims.create(IdleAnimation);
        scene.anims.create(WalkDownAnimation);
        scene.anims.create(WalkRightAnimation);
		scene.anims.create(WalkUpAnimation);
		scene.anims.create(PointUpAnimation);
		scene.anims.create(AttackDownAnimation);
		scene.anims.create(AttackUpAnimation);
		scene.anims.create(AttackRightAnimation);
		this.anims.load('attack-right');
        this.anims.load('idle');
        this.anims.load('walk-down');
        this.anims.load('walk-right');
		this.anims.load('walk-up');
		this.anims.load('point-up');
		this.anims.load('attack-down');
		this.anims.load('attack-up');
		this.anims.play('idle');

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
			this.setVelocityY(-this.SPEED);
		}

		if(this.keys.down.isDown) {
			this.setVelocityY(this.SPEED);
		}

		if(this.keys.right.isDown) {
			this.setVelocityX(this.SPEED);
		}

		if(this.keys.left.isDown) {
			this.setVelocityX(-this.SPEED);
		}
    }
}