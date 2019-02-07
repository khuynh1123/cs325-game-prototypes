"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
	
	
	
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render} );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.spritesheet("cat", "assets/cat.png", 640, 640);
    }
    
	var player;
	var cursors;
	
    function create() {
		
		game.world.setBounds(0, 0, 1920, 1080);
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		
		player = game.add.sprite(300, 100, "cat");
		player.scale.setTo(.25, .25);
		
		game.physics.p2.enable(player);
		
		player.body.fixedRotation = true;
		
		cursors = game.input.keyboard.createCursorKeys();
		
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		
		
		// Cat animation
		player.animations.add("idle", [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
		player.animations.add("walk", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		
		
		player.animations.play("idle", 10, true);
		
	
    }
    
    function update() {
		
		player.body.setZeroVelocity();
		
		
		if (cursors.up.isDown) {
			player.body.moveUp(100);
		}
		
		if (cursors.left.isDown) {
			player.body.moveLeft(100);
		}
		else if (cursors.right.isDown) {
			player.body.moveRight(100);
		}
    }
	
	function render() {
		
	}
};