import Phaser from "phaser";
import config from "./config/config";
import GameScene from "./scenes/GameScene";
import StartScene from "./scenes/StartScene";
class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Start', StartScene);
    this.scene.start('Start');
  }
}

window.onload = function() {
  window.game = new Game();
}

