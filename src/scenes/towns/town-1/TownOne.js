import { constants } from '../../../constants';
import { STATE } from '../../../state';

//Tilemap
import TownOneIMG from '../../../assets/tilemaps/village.png';
import TownOneRoofIMG from '../../../assets/tilemaps/roofs.png';
import TownOneJSON from './town-1.json';

//Player,Enemies & NPCs
import PlayerIMG from '../../../assets/units/player.png';
import Player from '../../../objects/units/Player';

export class TownOne extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.TOWNS.TOWNONE
		});
	}

	preload() {
		//Load tilemap assets.
		this.load.image('TownOneIMG',TownOneIMG);
		this.load.tilemapTiledJSON('TownOneJSON',TownOneJSON);
		this.load.spritesheet('Player',PlayerIMG,{frameWidth: 48,frameHeight: 48});
	}

	create() {
		//Create the actual tilemap.
		this.map = this.make.tilemap({key: 'TownOneJSON'});
		this.tiles = this.map.addTilesetImage('village','TownOneIMG');
		this.ground = this.map.createStaticLayer('Base',this.tiles,0,0);
		this.flowers = this.map.createStaticLayer('Flowers',this.tiles,0,0);
		this.trees = this.map.createStaticLayer('Trees',this.tiles,0,0);
		this.buildings = this.map.createStaticLayer('Buildings',this.tiles,0,0);
		this.decorations = this.map.createStaticLayer('Decorations',this.tiles,0,0);
		this.trees = this.map.createStaticLayer('Top',this.tiles,0,0);
		this.ground.setCollisionByProperty({collides:true});
		this.buildings.setCollisionByProperty({collides:true});
		this.decorations.setCollisionByProperty({collides:true});
		this.trees.setCollisionByProperty({collides:true});

		//Add the Player
		this.player = new Player(this,100,100,{key: 'Player'});
		this.physics.add.collider(this.player,this.ground);
		this.physics.add.collider(this.player,this.buildings);
		this.physics.add.collider(this.player,this.decorations);
		this.physics.add.collider(this.player,this.trees);
	}

	update() {

	}
}