import { constants } from '../constants';
import { STATE } from '../state';

//IMAGE ASSETS
import PlayerIMG from '../assets/units/player.png';
import SlimeIMG from '../assets/units/slime.png';
import TorchIMG from '../assets/decorations/torch.png';
import SpikeIMG from '../assets/traps/spike.png';
import RedGemIMG from '../assets/items/Items_RedGem.png';
import GreenGemIMG from '../assets/items/Items_GreenGem.png';
import BlueGemIMG from '../assets/items/gem_4.png';
import CoinIMG from '../assets/items/coin_2.png';
import UiIMG from '../assets/ui/ui.png';
import LootCoin from '../assets/items/Coin_Sparkle.png'

//GAME OBJECTS
	//UNITS
	import Player from '../objects/units/Player';
	import Slime from '../objects/units/Slime';
	import Torch from '../objects/decorations/Torch';
	import Spikes from '../objects/traps/Spikes';

	//LOOT ITEMS
	import Item from '../objects/items/Item.js';

	//ENVIROMENTS
	import Dungeon from '../objects/enviroments/Dungeon';

	//UI
	import HealthBars from '../objects/ui/HealthBars';
	import LootInfo from '../objects/ui/LootInfo';

	//TILEMAPS
	import DungeonTiles from '../assets/tilemaps/dungeon/sheet.png';
	import DungeonJSON from '../assets/tilemaps/dungeon/dungeon.json';
	import HouseTiles from '../assets/tilemaps/house/Village_Tileset.png';
	import HouseJSON from '../assets/tilemaps/house/house.json';
	import House from '../objects/enviroments/House';


export class GamePlay extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.GAMEPLAY
		});
	}

	preload() {
		this.load.image('DungeonTiles',DungeonTiles);
		this.load.image('HouseTiles',HouseTiles);
		this.load.tilemapTiledJSON('HouseJSON',HouseJSON);
		this.load.tilemapTiledJSON('DungeonJSON',DungeonJSON);
		this.load.spritesheet('Player',PlayerIMG,{frameWidth: 48,frameHeight: 48});
		this.load.spritesheet('Slime',SlimeIMG,{frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('Torch',TorchIMG,{frameWidth: 16,frameHeight: 16});
		this.load.spritesheet('Spike',SpikeIMG,{frameWidth: 16,frameHeight: 16});
		this.load.spritesheet('RedGem',RedGemIMG,{frameWidth: 16,frameHeight: 16});
		this.load.spritesheet('GreenGem',GreenGemIMG,{frameWidth: 16,frameHeight: 16});
		this.load.image('BlueGem',BlueGemIMG);
		this.load.image('Coin',CoinIMG);
		this.load.spritesheet('HealthUI',UiIMG,{frameWidth: 116,frameHeight: 81});
		this.load.spritesheet('LootCoin',LootCoin,{frameWidth: 32,frameHeight: 32});
	}

	create() {
		const _this = this;
		
		this.lootInfo = new LootInfo(this,0,0,{
			coin: _this.add.sprite(292,10,'LootCoin'),
			STATE: STATE
		});
		this.fix = this.add.graphics();
		this.HealthUI = new HealthBars(this,0,0,'HealthUI')
		this.enemies = this.physics.add.group({
			collideWorldBounds: true,
			dragX: 40,
			dragY: 40,
			bounceX: .8,
			bounceY: .8
		});
		this.loot = this.physics.add.group({
			collideWorldBounds: true,
			dragX: 40,
			dragY: 40
		});
		this.decorations = new Array();
		this.house = new Dungeon(this)

		this.Player = new Player(this,100,100,{key: 'Player'});

		this.physics.add.collider(this.Player,this.house.walls)
		this.physics.add.collider(this.Player,this.house.decorations)

		//Add Loot to the game TEMPORARY
		this.loot.add(new Item(this,90,60,{key:'Coin'}))
		this.loot.add(new Item(this,0,0,{key:'Coin'}))
		this.loot.add(new Item(this,10,10,{key:'Coin'}))
		this.loot.add(new Item(this,10,20,{key:'BlueGem'}))
		this.loot.add(new Item(this,20,30,{key:'Coin'}))

		this.loot.add(new Item(this,150,150,{key:'Coin'}))
		this.loot.add(new Item(this,70,170,{key:'Coin'}))
		this.physics.add.collider(this.Player,this.loot);
		this.physics.add.collider(this.Player,this.house.walls)

		for(let i = 0;i < 500;i++) {
			this.loot.add(new Item(this,Math.random(100) * 100,Math.random(100) * 100,{key:'Coin'}))
		}

		
		//Add the enemies to the scene.
		this.enemies.add(new Slime(this,30,120,{key: 'Slime'}))
		this.enemies.add(new Slime(this,25,70,{key: 'Slime'}))
		this.enemies.add(new Slime(this,40,30,{key: 'Slime'}))
		this.physics.add.collider(this.Player,this.enemies);
		this.physics.add.collider(this.enemies,this.house.walls);

		/*
		this.decorations.push(new Torch(this,20,20,{key: 'Torch'}));
		this.decorations.push(new Torch(this,20,40,{key: 'Torch'}));
		this.decorations.push(new Torch(this,20,60,{key: 'Torch'}));

		new Spikes(this,30,30,{key:'Spike'})
		*/

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
			_this.Player.anims.play('walk-right');
			_this.Player.flipX = true;
		})

		this.cursor.down.on('up',function() {
			if(!_this.cursor.up.isDown && !_this.cursor.left.isDown && !_this.cursor.right.isDown){
				_this.Player.anims.play('idle');
				_this.Player.flipX = false;
			}
		})

		this.cursor.right.on('up',function() {
			if(!_this.cursor.down.isDown && !_this.cursor.up.isDown && !_this.cursor.left.isDown){
				_this.Player.anims.play('idle');
				_this.Player.flipX = false;
			}
		})

		this.cursor.up.on('up',function() {
			if(!_this.cursor.down.isDown && !_this.cursor.left.isDown && !_this.cursor.right.isDown){
				_this.Player.anims.play('idle');
				_this.Player.flipX = false;
			}
		})

		this.cursor.left.on('up',function() {
			if(!_this.cursor.up.isDown && !_this.cursor.down.isDown && !_this.cursor.right.isDown){
				_this.Player.anims.play('idle');
				_this.Player.flipX = false;
			}
		});

		this.physics.world.step(0)
	}

	update() {
		const _this = this;
		if(this.cursor.down.isDown) {
			this.Player.setVelocityY(60);
		}

		if(this.cursor.up.isDown) {
			this.Player.setVelocityY(-60)
		}

		if(this.cursor.left.isDown) {
			this.Player.setVelocityX(-60)
		}

		if(this.cursor.right.isDown) {
			this.Player.setVelocityX(60)
		}

		this.loot.children.each(function(loot) {
			let distance = Phaser.Math.Distance.Between(loot.x,loot.y,_this.Player.x,_this.Player.y)

			if(distance < 50) {
				_this.physics.accelerateToObject(loot,_this.Player,1000,1000)
			}
			
			if (distance < 20) {
				STATE.LOOT.COINS += 1
				loot.destroy();
			}
		})

	}
}