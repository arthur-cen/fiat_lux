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

        this.clickButton = this.add.text(300, 300, 'Start the journey', { fill: 'white' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start("Game") )
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() );

    }
    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: 'yellow'});
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: 'white' });
    }

    enterButtonActiveState() {
        this.clickButton.setStyle({ fill: 'red' });
      }

    update() {

    }
}