import { STATE } from '../../state';
import StateHelper from '../../util/StateHelper';

export default class NPC extends Phaser.Physics.Arcade.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);

		scene.physics.world.enable(this);
		scene.add.existing(this);

		this._scene = scene;
		this.movement = scene.time.addEvent({delay: 2000,callback:this.moveDirection,callbackScope:this,loop:true})
		this.id = config.id ? config.id : null;

		this.OCCUPIED = false;
		this.DIALOG = config.dialog;
		this.DATA = config.data;
		this.CURRENT_LINE = 0;

		//Only show the diaog bubble if the NPC has a message.
		if(this.DATA.MESSAGES) {
			this.bubble = scene.add.sprite(x - 2 ,y - 17,'Bubbles');
			this.bubble.setVisible(false);
			this.bubble.setFrame(125)
		}

		this.stateHelper = new StateHelper(STATE);
		//Create the player control key bindings and add event listeners
		this.keys = scene.input.keyboard.addKeys({
			enter:Phaser.Input.Keyboard.KeyCodes.ENTER
		});
		this.keys.enter.on('down',function(){
			if(this.DATA.MESSAGES[0].LINES.length > 1 && this.CURRENT_LINE < (this.DATA.MESSAGES[0].LINES.length - 1)) {
				this.CURRENT_LINE++;
				this.showMessage();
			} else {
				//If the last line had been reached and it could complete a quest, complete it.
				if(this.CURRENT_LINE === (this.DATA.MESSAGES[0].LINES.length - 1)) {
					if(this.DATA.MESSAGES[0].REF && this.DATA.MESSAGES[0].COMPLETES) {
						this.stateHelper.CompleteTask(this.DATA.MESSAGES[0].REF,this.DATA.MESSAGES[0].COMPLETES)
					}
				}

				this.CURRENT_LINE = 0;
				this.DIALOG.dialogText.setVisible(false);
				this.DIALOG.dialogText.text = '';
				this.DIALOG.setVisible(false);
				this.DIALOG.IS_OPEN = false;
				this.OCCUPIED = false;
			}
		},this);

        let NPCWalkDownAnimation = {
            key: 'npc-walk-down',
            frames: [
                {
                    key: 'HumanNPC',
                    frame: 0
                },
                {
                    key: 'HumanNPC',
                    frame: 1
                },
                {
                    key: 'HumanNPC',
                    frame: 2
                }
            ],
            frameRate: 6,
            repeat: -1
        }

        let NPCWalkRightAnimation = {
            key: 'npc-walk-right',
            frames: [
                {
                    key: 'HumanNPC',
                    frame: 3
                },
                {
                    key: 'HumanNPC',
                    frame: 4
                },
                {
                    key: 'HumanNPC',
                    frame: 5
				}
            ],
            repeat: -1
        }

        let NPCWalkUpAnimation = {
            key: 'npc-walk-up',
            frames: [
                {
                    key: 'HumanNPC',
                    frame: 6
                },
                {
                    key: 'HumanNPC',
                    frame: 7
                },
                {
                    key: 'HumanNPC',
                    frame: 8
                }
            ],
            repeat: -1
        }

		//Create a load all the needed animations
        this._scene.anims.create(NPCWalkDownAnimation);
        this._scene.anims.create(NPCWalkRightAnimation);
		this._scene.anims.create(NPCWalkUpAnimation);
        this.anims.load('npc-walk-down');
        this.anims.load('npc-walk-right');
		this.anims.load('npc-walk-up');
	}

	showMessage() {
		if(this.DIALOG) {
			this.setVelocity(0);
			this.OCCUPIED = true;
			this.DIALOG.setVisible(true);

			//If there is more than one line then show the first and handle going through them, 
			//otherwise the just show the first single line itself.
			if(this.DATA.MESSAGES[0].LINES.length > 1) {
				this.DIALOG.setMessage(this.DATA.MESSAGES[0].LINES[this.CURRENT_LINE].CONTENT);
			} else {
				this.DIALOG.setMessage(this.DATA.MESSAGES[0].LINES[0].CONTENT);
			}
		}
	}

	preUpdate() {
		if(this.DATA.MESSAGES) {
			this.bubble.x = this.x - 2;
			this.bubble.y = this.y - 17;
		}
	}

	moveDirection() {
		if(!this.OCCUPIED) {
			let directions = [
				'right',
				'left',
				'up',
				'down'
			]

			switch(directions[Math.floor(Math.random() * 4)]) {
				case 'up':
					this.anims.play('npc-walk-up');
					this.setVelocityY(-20)
				break;
				case 'right':
					this.anims.play('npc-walk-right')
					this.flipX = true;
					this.setVelocityX(20)
				break;
				case 'left':
					this.anims.play('npc-walk-right')
					this.flipX = false;
					this.setVelocityX(-20)
				break;
				default:
					this.anims.play('npc-walk-down')
					this.setVelocityY(20)
				break;
			}
		}
	}
}