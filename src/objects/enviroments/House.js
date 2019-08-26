export default class House {
    constructor(scene) {
        this.map = scene.make.tilemap({key: 'HouseJSON'});
        this.tiles = this.map.addTilesetImage('house','HouseTiles');

        this.walls = this.map.createStaticLayer('Base',this.tiles,0,0);
        this.map.createStaticLayer('Carpets',this.tiles,0,0)
        this.decorations = this.map.createStaticLayer('Decorations',this.tiles,0,0)
        this.map.createStaticLayer('Above',this.tiles,0,0)

        this.walls.setCollisionByProperty({collides: true})
        this.decorations.setCollisionByProperty({collides: true})
    }
}