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
        this.add.text(250, 200, 'Let there be light.', {font: "36px Arial", fill: "yellow"});

    }

    update() {


    }

}