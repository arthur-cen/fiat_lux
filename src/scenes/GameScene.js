import 'phaser';
// import logoImg from "../assets/logo.png";
import tiles from "../assets/tilesets/Dungeon_Tileset.png";
import townmap from "../assets/tilemaps/level1.json";
import atlas from "../assets/atlas/atlas.png"
import atlasJSON from "../assets/atlas/atlas.json"
import light from "../assets/tilemaps/lamp.png";
import lightJSON from "../assets/tilemaps/lamp.json";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    
    preload() {
        this.load.image("tiles", tiles);
        this.load.tilemapTiledJSON("map", townmap);
        this.load.atlas("atlas", atlas, atlasJSON);
        this.load.atlas("light", light, lightJSON);
      }
      
    create() {
        //Load map and the tileset
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Dungeon_Tileset", "tiles");
        //store the map
        this.map = map;

        

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const dec = map.createStaticLayer("decoration", tileset, 0, 0);
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        
        
        // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
        //set a layer that sits on top of the player
        // aboveLayer.setDepth(10);
        //Add player to the game
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        const ending = map.findObject("Objects", obj => obj.name === "End Point");

        this.ending = this.physics.add
        .sprite(ending.x-300, ending.y)
        .setSize(600, 600)
        .setOffset(0, 24);
        
        this.player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
        .setSize(30, 30)
        .setOffset(0, 24);
        
        const darkness = this.add.graphics();
        darkness.fillStyle(0x000000, 1);
        darkness.fillRect(0, 0, map.width * map.tileWidth, map.height * map.tileHeight);
        darkness.setDepth(10);

        this.darkness = darkness;

       //make a circle
       this.spotLight = this.make.graphics();
       //  Create a hash shape Graphics object
       this.spotLight.fillStyle(0xffffff);
       this.tweens.add({
         targets: this.spotLight,
         alpha: {value: 0.5, duration: 3000, ease: 'Power1'},
         scaleX: {value: 1.5, duration: 3000, ease: 'Power1'},
         scaleY: {value: 1.5, duration: 3000, ease: 'Power1'},
         yoyo:true,
         loop: -1
       })

       //  You have to begin a path for a Geometry mask to work
       this.spotLight.beginPath();

       this.spotLight.fillCircle(0, 0, 64);

       darkness.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotLight);
       darkness.mask.invertAlpha = true

        //create collision between player and the world
        this.physics.add.collider(this.player, worldLayer);

        const anims = this.anims;
        // creating player animation
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", {
              prefix: "misa-left-walk.",
              start: 0,
              end: 3,
              zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
          });
          anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", {
              prefix: "misa-right-walk.",
              start: 0,
              end: 3,
              zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
          });
          anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", {
              prefix: "misa-front-walk.",
              start: 0,
              end: 3,
              zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
          });
          anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", {
              prefix: "misa-back-walk.",
              start: 0,
              end: 3,
              zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
          });

        //create lamps
        this.createLamps();

        this.physics.add.collider(this.player, this.lampPoints, (player, lamp) => this.handleLampDiscovery(player, lamp));
       
        this.physics.add.collider(this.player, this.ending, () => this.scene.start("End"));

        // creating light animation
        anims.create({
            key: "light",
            frames: anims.generateFrameNames("light", {
              prefix: "lamp",
              start: 1,
              end: 4,
              suffix: ".png",
              zeroPad: 0
            }),
            frameRate: 10,
            repeat: -1
          });
          //myLamp.anims.play("light", true);

        //create a camera that follows the player
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        //bound the camera to the map
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //setup collison with world layer
        worldLayer.setCollisionBetween(12, 44);
        worldLayer.setCollisionByProperty({ collide: true });
        
        this.cursors = this.input.keyboard.createCursorKeys();

        // Debug graphics
        this.input.keyboard.on("keydown_D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();
            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add
                .graphics()
                .setAlpha(0.75)
                .setDepth(20);
            worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        });
    }

    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();
        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);
        this.spotLight.x = this.player.x;
        this.spotLight.y = this.player.y;
        // Horizontal movement
        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }

        //this.playLamps();
      
        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        if (this.cursors.left.isDown) {
            this.player.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
            this.player.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
            this.player.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
            this.player.anims.play("misa-front-walk", true);
        } else {
            this.player.anims.stop();
            if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
        }
        // // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);
    }  

    createLamps() {
      const lampPoints = this.map.createFromObjects("lamp", "lamp", {
        //Sprite Config here
        key: "light",
        frame: "lamp1.png"
      })
      for (let i = 0; i < lampPoints.length; i++) {
        lampPoints[i].setData("on", true);
      }
      console.log(this.map);
      // console.log(lampPoints);
      this.lampPoints = lampPoints;
    }

    handleLampDiscovery(player, lamp) {
      if (!lamp.tweenPlaying) {
        lamp.tweenPlaying = true;
        let newSpotLight = this.make.graphics();
        //  Create a hash shape Graphics object
        newSpotLight.fillStyle(0xffffff);
        newSpotLight.beginPath();
        newSpotLight.fillCircle(0, 0, 64);
  
        this.darkness.setMask(new Phaser.Display.Masks.BitmapMask(this, newSpotLight));
        this.darkness.mask.invertAlpha = true
        newSpotLight.x = lamp.x;
        newSpotLight.y = lamp.y;
        this.tweens.add({
          targets: newSpotLight,
          scaleX: {value: 10, duration: 2000, hold: 3000, ease: 'Power1'},
          scaleY: {value: 10, duration: 2000, hold: 3000, ease: 'Power1'},
          yoyo: true,
          onComplete: () => {
            this.darkness.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotLight);
            this.darkness.mask.invertAlpha = true
            lamp.tweenPlaying = false;
          }
        })
      }
    }

    playLamps() {
      for (let i = 0; i < lampPoints.length; i++) {
        if (lampPoints[i].on) {
          lampPoints.anims.play("light", true);
        }
      }
    }
}
