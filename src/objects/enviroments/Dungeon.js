export default class Dungeon {
	constructor(scene) {

		this.map = scene.make.tilemap({key: 'DungeonJSON'});
		this.tiles = this.map.addTilesetImage('dungeon','DungeonTiles');

		this.map.createStaticLayer('Base',this.tiles,0,0)
		this.map.createStaticLayer('Decorations',this.tiles,0,0)
	}
}