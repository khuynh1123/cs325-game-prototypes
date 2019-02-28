"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    
	
	function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () {
			
			game.world.setBound(0, 0, 1920, 1080);
			game.physics.startSystem(Phaser.Physics.Arcade);
			
			map = game.add.timemap("map");
			map.addTilesetImage("platformtilesheet", "maptiles");
			map.addTilesetImage("foregroundtilemap", "foregroundtiles");
			
			backgroundLayer = map.createLayer("background");
			groundLayer = map.createLayer("ground");
			foregroundLayer = map.createLayer("foreground");
			
			
			layer.resizeWorld();
			map.setCollisionBetween(0, 5);
			map.setCollisionBetween(7, 15);
			
			
			var pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
			pauseKey.onDown.add(this.menu, this);
			
			
			var blurX = game.add.filter("BlurX");
			blurX.blur = 1;
			
			
        },
    
        update: function () {
    
        },
		
		menu: function () {
			this.paused = true;
			
			
			this.filters = [blurX];
		}
    };
};
