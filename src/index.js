import Phaser from "phaser";
import { MenuScene } from './scenes/MenuScene';
import { GamePlay } from './scenes/GamePlay';
import { constants } from './constants';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: constants.GAME.WIDTH,
  height: constants.GAME.HEIGHT,
  scene: [
	  MenuScene,
	  GamePlay
  ],
  physics: {
	  default: 'arcade',
	  arcade :{
		  debug: true
	  }
  }
};

const game = new Phaser.Game(config);
