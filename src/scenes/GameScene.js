import 'phaser';
// import logoImg from "../assets/logo.png";
import tiles from "../assets/tilesets/tuxmon-sample-32px-extruded.png";
import townmap from "../assets/tilemaps/tuxemon-town.json";
import atlas from "../assets/atlas/atlas.png"
import atlasJSON from "../assets/atlas/atlas.json"
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    
    preload() {
        this.load.image("tiles", tiles);
        this.load.tilemapTiledJSON("map", townmap);
        this.load.atlas("atlas", atlas, atlasJSON);
      }
      
    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

          // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionBetween(12, 44);
        worldLayer.setCollisionByProperty({ collides: true });
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        this.player = this.physics.add.sprite(400, 350, "atlas", "misa-front");

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        const speed = 175;
        // const prevVelocity = player.body.velocity.clone();
        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);
      
        // Horizontal movement
        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(100);
        }
      
        // Vertical movement
        if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(100);
        }
      
        // // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);
    }  
}
