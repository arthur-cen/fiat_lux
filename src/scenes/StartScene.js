import 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {

    }

    create() {

        this.add.text(250, 100, 'Flat_lux', {font: "78px Arial", fill: "white"});
        this.add.text(250, 200, 'A journey on light.', {font: "36px Arial", fill: "yellow"});

        const clickButton = this.add.text(300, 300, 'Start the journey.', { fill: 'white' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start("Game") );

    }

    update() {

    }
}