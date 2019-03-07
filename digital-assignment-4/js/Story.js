"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
	var map = null;
    var backgroundLayer;
	var groundLayer;
	var foregroundLayer;
	
	var cursors;
	var tunaScore = 0;
	var tunaText;
	
	
	var player;
	var tuna = null;
	var crunch;
	
	function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
		
        game.state.start('MainMenu');
    }
	
    
    return {
    
        create: function () {
			
			game.world.setBounds(0, 0, 1920, 1080);
			game.physics.startSystem(Phaser.Physics.Arcade);
			
			map = game.add.tilemap("map");
			map.addTilesetImage("platformtilesheet", "maptiles");
			map.addTilesetImage("foregroundtilemap", "foregroundtiles");
			
			
			groundLayer = map.createLayer("groundLayer");
			map.createLayer("backgroundLayer");
			map.createLayer("foregroundLayer");
			
			
			groundLayer.resizeWorld();
			map.setCollisionBetween(0, 5, true, groundLayer);
			map.setCollisionBetween(7, 15, true, groundLayer);
			
			
			player = game.add.sprite(150, game.world.height - 150, "player");
			game.physics.enable(player);
			player.body.setSize(45, 40, 15, 10);
			player.anchor.setTo(.5, .5);
			
			player.body.gravity.y = 400;
					
			player.body.collideWorldBounds = true;
			player.body.fixedRotation = true;
			
			tuna = game.add.group();
			tuna.enableBody = true;
					
			map.createFromObjects("objects", "tuna", "tuna", null, true, false, tuna);
			
			game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
			//game.camera.follow(player);
			
			// Input setup
			cursors = game.input.keyboard.createCursorKeys();
			
			// Cat animation
			player.animations.add("idle", [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 10, true);
			player.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,], 10, true);
			
			
			crunch = game.add.audio("crunch");
			
			var pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
			pauseKey.onDown.add(this.menu, this);
			
			tunaText = game.add.text(10, 20, tunaScore + " of 6 tuna collected.", {font: "24px Arial", fill: "#ffffff", align: "left"});
			tunaText.fixedToCamera = true;
			
			
			var blurX = game.add.filter("BlurX");
			blurX.blur = 1;
			
			
        },
    
        update: function () {
				
			game.physics.arcade.collide(player, groundLayer);
			game.physics.arcade.overlap(player, tuna, this.collectTuna, null, this);
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
		
        },
		
		menu: function () {
			if (game.paused == true) {
				game.paused = false;
			} else {
				game.paused = true;
			}
			
			
			//game.filters = [blurX];
		},
		
	
	    collectTuna: function(player, tuna) {
			tuna.kill();
			crunch.play();
			shared.totalTuna++;
			shared.totalStoryTuna++;
			tunaScore++;
			if (tunaScore == 6) {
				// go to win screen and main menu
				this.enterWin();
			}
			tunaText.setText(tunaScore + " of 6 tuna collected.");
		},
		
		enterWin: function() {
			shared.win = true;
			game.state.start("PostScreen");
		}
		
    };
};
