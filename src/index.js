import Phaser from "phaser";
import { constants } from './constants';

//IMPORT SCENES
import { TownOne } from './scenes/towns/town-1/TownOne';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: constants.GAME.WIDTH,
  height: constants.GAME.HEIGHT,
  scene: [
	  TownOne
  ],
  physics: {
    default: 'arcade',
	  arcade :{
		  debug: true
	  }
  },
  zoom: 4
};

const game = new Phaser.Game(config);
