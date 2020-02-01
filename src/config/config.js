export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1200, // Canvas width in pixels
    height: 800, // Canvas height in pixels
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 } // Top down game, so no gravity
        }
      }
  };