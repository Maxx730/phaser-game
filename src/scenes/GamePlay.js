import { constants } from '../constants';
import ChestClosed from '../assets/chest-closed.png';
import Key from '../assets/key.png';
import Tunic from '../assets/tunic.png';
import TornMap from '../assets/map.png';
import Cursor from '../assets/cursor.png';

export class GamePlay extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.GAMEPLAY
		});
	}

	preload() {
		this.load.image('chest-closed',ChestClosed);
		this.load.image('key',Key);
		this.load.image('tunic',Tunic);
		this.load.image('map',TornMap);
		this.load.image('cursor',Cursor);
	}

	create() {

		this.zone = this.add.zone(200,200).setSize(200,200);
		this.physics.world.enable(this.zone);
		this.zone.body.setAllowGravity(false);
		this.zone.body.moves = false;

		let cursor = this.physics.add.sprite(500,20,'cursor');
		cursor.setImmovable(true)
		let circle = new Phaser.Geom.Circle(100,100,200);
		let maps = this.physics.add.group({
			key: 'map',
			frameQuantity: 12,
			collideWorldBounds: true,
			bounceY: .75,
			bounceX: .75
		});

		Phaser.Actions.PlaceOnCircle(maps.getChildren(),circle)

		let chests = this.physics.add.group({
			bounceX: .75,
			bounceY: .75,
			collideWorldBounds: true,
		});

		var chest1 = chests.create(300,10,'chest-closed').setVelocity(-100,0);
		var chest2 = chests.create(350,50,'chest-closed').setVelocity(-200,-20);
		var chest3 = chests.create(140,100,'chest-closed').setVelocity(200,-50);

		let tunics = this.physics.add.group({
			bounceX: .25,
			bounceY: .25,
			collideWorldBounds: true,
			dragX: 10
		});

		var tunic1 = tunics.create(100,10,'tunic').setVelocity(-100,0);
		var tunic2 = tunics.create(100,50,'tunic').setVelocity(-200,-20);
		var tunic3 = tunics.create(100,100,'tunic').setVelocity(200,-50);


		let context = this;
		this.physics.add.overlap(maps,this.zone)

		this.input.on('pointermove',function(pointer) {

			cursor.setPosition(pointer.x,pointer.y)
		})

		this.input.on('pointerdown',function(pointer) {
			Phaser.Utils.Array.Each(
				chests.getChildren(),
				context.physics.moveToObject,
				context.physics,
				cursor,
				120
			)

			Phaser.Utils.Array.Each(
				maps.getChildren(),
				context.physics.moveToObject,
				context.physics,
				cursor,
				120
			)
		});

		this.input.on('pointerup',function(pointer) {

		});
	}

	update() {
		this.zone.body.debugBodyColor = this.zone.body.touching.none ? 0x0ff00f : 0x0ff0000;
	}
}