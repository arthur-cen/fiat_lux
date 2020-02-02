import 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('End');
    }

    preload() {

    }

    create() {

        // title
        this.add.text(250, 100, 'Congrats!', {font: "78px Arial", fill: "white"});
        this.add.text(250, 200, 'You find your way out.', {font: "36px Arial", fill: "yellow"});

        // start button
        this.clickButton = this.add.text(300, 300, 'Revisit the journey', { fill: 'white' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start("StartGame") )
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


    }

}