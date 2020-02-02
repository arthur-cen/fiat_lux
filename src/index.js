import Phaser from "phaser";
import config from "./config/config";
import GameScene from "./scenes/GameScene";
import StartScene from "./scenes/StartScene";
import EndScene from "./scenes/EndScene";
class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Start', StartScene);
    this.scene.add('End', EndScene);
    this.scene.start('Start');
    //this.scene.start('Game');
  }
}

window.onload = function() {
  window.game = new Game();
}

