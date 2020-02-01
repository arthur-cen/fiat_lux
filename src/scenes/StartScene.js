import 'phaser';
//import dark from '../assets/sounds/dark.m4a';
//import fix from "../assets/sounds/fixing.mp3";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        let songLoader = this.load.audio('bgmusic', '../assets/sounds/fixing.mp3');
        //songLoader.on('filecomplete', () => this.sound.add('bgmusic').play());
        //songLoader.start();
    }

    create() {
        
        let bgmusic = this.sound.add('bgmusic');
        bgmusic.play();

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