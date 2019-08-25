import { constants } from '../constants';
//IMAGE ASSETS
import PlayerIMG from '../assets/units/player.png';
import SlimeIMG from '../assets/units/slime.png';
import TorchIMG from '../assets/decorations/torch.png';
import SpikeIMG from '../assets/traps/spike.png';

//GAME OBJECTS
	//UNITS
	import Player from '../objects/units/Player';
	import Slime from '../objects/units/Slime';
	import Torch from '../objects/decorations/Torch';
	import Spikes from '../objects/traps/Spikes';

	//ENVIROMENTS
	import Dungeon from '../objects/enviroments/Dungeon';

	//TILEMAPS
	import DungeonTiles from '../assets/tilemaps/dungeon/sheet.png';
	import DungeonJSON from '../assets/tilemaps/dungeon/dungeon.json';


export class GamePlay extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.GAMEPLAY
		});
	}

	preload() {
		this.load.image('DungeonTiles',DungeonTiles);
		this.load.tilemapTiledJSON('DungeonJSON',DungeonJSON);
		this.load.spritesheet('Player',PlayerIMG,{frameWidth: 24,frameHeight: 24});
		this.load.spritesheet('Slime',SlimeIMG,{frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('Torch',TorchIMG,{frameWidth: 16,frameHeight: 16});
		this.load.spritesheet('Spike',SpikeIMG,{frameWidth: 16,frameHeight: 16});
	}

	create() {
		this.enemies = new Array();
		this.decorations = new Array();
		const _this = this;
		new Dungeon(this);
		this.Player = new Player(this,100,100,{key: 'Player'});

		//Add the enemies to the scene.
		this.enemies.push(new Slime(this,120,120,{key: 'Slime'}))
		this.enemies.push(new Slime(this,50,135,{key: 'Slime'}))
		this.enemies.push(new Slime(this,80,80,{key: 'Slime'}))

		this.decorations.push(new Torch(this,20,20,{key: 'Torch'}));
		this.decorations.push(new Torch(this,20,40,{key: 'Torch'}));
		this.decorations.push(new Torch(this,20,60,{key: 'Torch'}));

		new Spikes(this,30,30,{key:'Spike'})

		this.cursor = this.input.keyboard.createCursorKeys();
		this.cursor.down.on('down',function() {
			_this.Player.anims.play('walk-down');
		})

		this.cursor.right.on('down',function() {
			_this.Player.anims.play('walk-right');
		})

		this.cursor.up.on('down',function() {
			_this.Player.anims.play('walk-up');
		})

		this.cursor.left.on('down',function() {
			_this.Player.anims.play('walk-left');
		})

		this.cursor.down.on('up',function() {
			if(!_this.cursor.up.isDown && !_this.cursor.left.isDown && !_this.cursor.right.isDown){
				_this.Player.anims.play('idle');
			}
		})

		this.cursor.right.on('up',function() {
			if(!_this.cursor.down.isDown && !_this.cursor.up.isDown && !_this.cursor.left.isDown){
				_this.Player.anims.play('idle');
			}
		})

		this.cursor.up.on('up',function() {
			if(!_this.cursor.down.isDown && !_this.cursor.left.isDown && !_this.cursor.right.isDown){
				_this.Player.anims.play('idle');
			}
		})

		this.cursor.left.on('up',function() {
			if(!_this.cursor.up.isDown && !_this.cursor.down.isDown && !_this.cursor.right.isDown){
				_this.Player.anims.play('idle');
			}
		})
	}

	update() {
		if(this.cursor.down.isDown) {
			this.Player.y += this.Player.SPEED;
		}

		if(this.cursor.up.isDown) {
			this.Player.y -= this.Player.SPEED
		}

		if(this.cursor.left.isDown) {
			this.Player.x -= this.Player.SPEED
		}

		if(this.cursor.right.isDown) {
			this.Player.x += this.Player.SPEED
		}

		this.enemies.forEach(function(enemie) {
			
		})

		this.enemies.forEach(enemie => {
			enemie.randomizeDirection()
		})
	}
}