import { constants } from '../../../constants';
import { STATE } from '../../../state';
import StateHelper from '../../../util/StateHelper';

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
import XButtonIMG from '../../../assets/ui/x-button.png';

export class TownOne extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.TOWNS.TOWNONE.ID
		});
	}

	preload() {
		//Load tilemap assets.
		this.load.image('TownOneIMG',TownOneIMG);
		this.load.tilemapTiledJSON('TownOneJSON',TownOneJSON);
		this.load.spritesheet('Player',PlayerIMG,{frameWidth: 16,frameHeight: 16});
		this.load.image('DialogBox',DialogIMG);
		this.load.image('HealthBars',HealthIMG);
		this.load.image('XButton',XButtonIMG);
		this.load.spritesheet('HumanNPC',NPCImg,{frameWidth:16,frameHeight:16});
		this.load.spritesheet('Bubbles',BubbleIMG,{frameWidth: 16,frameHeight: 16});

	}

	create() {
		this.fix = this.add.graphics();
		this.stateHelper = new StateHelper(STATE)
		this.cameras.main.fadeIn(1500);
		this.NPCs = this.physics.add.group({
			dragX: 15,
			dragY: 15,
			collideWorldBounds: true,
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
		this.top = this.map.createStaticLayer('Top',this.tiles,0,0).setDepth(12);
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
		constants.SCENES.TOWNS.TOWNONE.NPCS.map(npc => {
			this.NPCs.add(new NPC(this,50,50,{key:'HumanNPC',dialog:this.dialog,data:npc}));
		})

		this.physics.add.collider(this.NPCs,this.NPCs);
		this.physics.add.collider(this.NPCs,this.buildings);
		this.physics.add.collider(this.NPCs,this.decorations);
		this.physics.add.collider(this.NPCs,this.player,null,function(player,npc) {
			if(npc.DATA.MESSAGES) {
				npc.showMessage()
			}
		},this);

		//Loads spacial tree 
		this.physics.world.step(0);
	}

	update() {
		//Logic for finding the nearest NPC
		this.NPCs.getChildren().map(npc => {
			if(Phaser.Math.Distance.Between(this.player.x,this.player.y,npc.x,npc.y) < 50) {
				npc.DATA.MESSAGES && npc.bubble.setVisible(true) 
			} else {
				npc.DATA.MESSAGES && npc.bubble.setVisible(false) 	
			}
		});
	}
}