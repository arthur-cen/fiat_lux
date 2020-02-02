import 'phaser';
export default class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.audio('bgmusic', [
            require("../assets/audio/dark.ogg"),
            require("../assets/audio/dark.mp3")
        ]);
    }

    create() {
        var music = this.sound.add('bgmusic');
        music.play();
        // title
        this.add.text(250, 100, 'Flat_lux', {font: "78px Arial", fill: "white"});
        this.add.text(250, 200, 'A journey on light.', {font: "36px Arial", fill: "yellow"});

        // start button
        this.clickButton = this.add.text(300, 300, 'Start the journey', { fill: 'white' })
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