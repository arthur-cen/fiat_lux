import 'phaser';
import light from "../assets/tilemaps/lamp.png";
import lightJSON from "../assets/tilemaps/lamp.json";
import ghost from "../assets/tilemaps/ghost.png";
import ghostJSON from "../assets/tilemaps/ghost.json";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.atlas("light", light, lightJSON);
        this.load.atlas("ghost", ghost, ghostJSON);

        let songLoader = this.load.audio('bgmusic', [
            require("../assets/audio/dark.ogg"),
            require("../assets/audio/dark.mp3")
        ]);
        songLoader.on('filecomplete', () => this.playMusic() );
    }

    playMusic() {
        var music = this.sound.add('bgmusic');
        music.play();
        music.loop = true;
    }

    create() {

        const anims = this.anims;
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
          anims.create({
              key: "ghost",
              frames: anims.generateFrameNames("ghost", {
                prefix: "ghost_0",
                start: 1,
                end: 6,
                suffix: ".gif",
                zeroPad: 0
              }),
              frameRate: 10,
              repeat: -1
            });

        let myLamp = this.physics.add
        .sprite(150,200, "light", "lamp2.png")
        .setSize(190, 310)
        .setOffset(0, 0);

        let myLamp2 = this.physics.add
        .sprite(850,200, "light")
        .setSize(190, 310)
        .setOffset(0, 0);

        let ghosts = [];
        for (let i; i < 10; i++) {
            ghosts.push(this.physics.add
                .sprite(100*i+50,400, "ghost")
                .setSize(48, 49)
                .setOffset(0, 0));
            ghosts[i].anims.play("ghost", true);
        }

        myLamp.anims.play("light", true);
        myLamp2.anims.play("light", true);


        // title
        this.add.text(350, 100, 'Flat_lux', {font: "78px Arial", fill: "white"});
        this.add.text(350, 200, 'A journey on light.', {font: "36px Arial", fill: "yellow"});

        // start button
        this.clickButton = this.add.text(400, 300, 'Start the journey', { fill: 'white' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start("Game") )
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )

    }
    // hover button effect
    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: 'yellow'});
    }

    // leave button effect
    enterButtonRestState() {
        this.clickButton.setStyle({ fill: 'white' });
    }

    update() {
        // let bgmusic = this.sound.add('bgmusic');
        // bgmusic.play();

    }

}