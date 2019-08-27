import { constants } from '../../../constants';
import { STATE } from '../../../state';

//Tilemap
import TownOneIMG from '../../../assets/tilemaps/village.png';
import TownOneRoofIMG from '../../../assets/tilemaps/roofs.png';
import TownOneJSON from './town-1.json';

//Player,Enemies & NPCs
import PlayerIMG from '../../../assets/units/player-alt.png';
import Player from '../../../objects/units/Player';
import NPCImg from '../../../assets/units/player-alt.png';
import NPC from '../../../objects/units/NPC';
import BubbleIMG from '../../../assets/units/bubble.png';
import GrayDogIMG from '../../../assets/units/gray_dog1.png';
import Chicken from '../../../assets/units/chicken1.png';

//User Interface
import DialogIMG from '../../../assets/ui/dialog-box.png';
import Dialog from '../../../objects/ui/Dialog';
import HealthIMG from '../../../assets/ui/health-small.png';
import Health from '../../../objects/ui/Health';

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
		this.load.spritesheet('Player',PlayerIMG,{frameWidth: 16,frameHeight: 16});
		this.load.image('DialogBox',DialogIMG);
		this.load.image('HealthBars',HealthIMG);
		this.load.spritesheet('HumanNPC',NPCImg,{frameWidth:16,frameHeight:16});
		this.load.spritesheet('Bubbles',BubbleIMG,{frameWidth: 16,frameHeight: 16});
		this.load.spritesheet('GrayDog',GrayDogIMG,{frameWidth: 15,frameHeight: 20});
		this.load.spritesheet('Chicken',Chicken,{frameWidth: 15,frameHeight: 20});
	}

	create() {
		this.NPCs = this.physics.add.group({
			immovable: true
		});

		//Create the actual tilemap.
		this.map = this.make.tilemap({key: 'TownOneJSON'});
		this.tiles = this.map.addTilesetImage('village','TownOneIMG');
		this.ground = this.map.createStaticLayer('Base',this.tiles,0,0);
		this.flowers = this.map.createStaticLayer('Flowers',this.tiles,0,0);
		this.subtrees = this.map.createStaticLayer('SubTrees',this.tiles,0,0);
		this.trees = this.map.createStaticLayer('Trees',this.tiles,0,0);
		this.buildings = this.map.createStaticLayer('Buildings',this.tiles,0,0);
		this.decorations = this.map.createStaticLayer('Decorations',this.tiles,0,0);
		this.top = this.map.createStaticLayer('Top',this.tiles,0,0);
		this.ground.setCollisionByProperty({collides:true});
		this.buildings.setCollisionByProperty({collides:true});
		this.decorations.setCollisionByProperty({collides:true});
		this.trees.setCollisionByProperty({collides:true});

		//Add the User Interface Objects here.
		this.dialog = new Dialog(this,125,85,{key: 'DialogBox'});
		new Health(this,5,5,{key: 'HealthBars'});

		//Add the Player
		this.player = new Player(this,100,100,{key: 'Player',dialog: this.dialog});
		this.physics.add.collider(this.player,this.ground);
		this.physics.add.collider(this.player,this.buildings);
		this.physics.add.collider(this.player,this.decorations);
		this.physics.add.collider(this.player,this.trees);

		//Add NPCs to map
		this.NPCs.add(new NPC(this,50,50,{key:'HumanNPC',dialog:this.dialog,message:['Nigglety Nigglety Nog, the','cat buttfucked the frog...'],id:'human1'}));
		this.NPCs.add(new NPC(this,80,30,{key:'HumanNPC',dialog:this.dialog,message:['The frog gave head, but now','its dead...'],id:'human2'}));

		this.NPCs.add(new NPC(this,120,230,{key:'HumanNPC',dialog:this.dialog,message:['Looks like that stupid bitch','Karol dug another trench with','her face...'],id:'human3'}));
		this.NPCs.add(new NPC(this,76,230,{key:'GrayDog',dialog:this.dialog,message:['Arf! Arf!'],id:'dog1'}));
		this.NPCs.add(new NPC(this,16,130,{key:'Chicken',dialog:this.dialog,message:['Fucker No Like'],id:'chicken1'}));

		this.physics.add.collider(this.NPCs,this.player,null,function(player,npc) {
			npc.showMessage();
		},this);
	}

	update() {

	}
}