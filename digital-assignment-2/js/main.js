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
    
	
	
	
    const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update} );
	
	var card;
	var deck;
	var flip;
	var player;
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.spritesheet("player", "assets/cat.png", 70, 55);
		game.load.tilemap("map", "assets/tilemap_1.json", null, Phaser.Tilemap.TILED_JSON);
		game.load.image("maptiles", "assets/platformtilesheet.png");
		game.load.image("tuna", "assets/tuna.png");
		game.load.audio("crunch", "assets/crunch.mp3");
		
		class Deck() {
			
			
		}
    }
	
	
    function create() {
		
		// Tilemap setup
		map = game.add.tilemap("map");
		map.addTilesetImage("platformtilesheet", "maptiles");
		
		// problem v
		layer = map.createLayer("ground");
		layer.resizeWorld();
		map.setCollisionBetween(0, 5);
		map.setCollisionBetween(7, 15);
		
		
		// Player setup
		player = game.add.sprite(200, game.world.height - 200, "player");
		game.physics.enable(player);
		player.anchor.setTo(.5, .5);
		
		player.body.gravity.y = 400;
		
		player.body.collideWorldBounds = true;
		player.body.fixedRotation = true;
		
		tuna = game.add.group();
		tuna.enableBody = true;
		
		map.createFromObjects("objects", "tuna", "tuna", null, true, false, tuna);
		
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
		
		
		card.anchor.setTo(0.5, 0.5);
		
		game.add.tween(card.to());
		
		
		// Input setup
		cursors = game.input.keyboard.createCursorKeys();
		
		
		
		// Cat animation
		player.animations.add("idle", [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 10, true);
		player.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,], 10, true);
		
		
		crunch = game.add.audio("crunch");
	
    }
    
    function update() {
		
		
		
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.overlap(player, tuna, collectTuna, null, this);
		player.body.velocity.x = 0;
		
		if (cursors.up.isDown && player.body.onFloor()) {
			player.body.velocity.y = -300;
		} else if (cursors.left.isDown) {
			player.scale.x = -1;
			player.animations.play("walk", 10, true);
			player.body.velocity.x = -175;
		} else if (cursors.right.isDown) {
			player.scale.x = 1;
			player.animations.play("walk", 10, true);
			player.body.velocity.x = 175;
		} else {
			player.animations.play("idle", 10, true);
		}
		
    }
	
	function collectTuna(player, tuna) {
		tuna.kill();
		crunch.play();
	}
};