"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            //preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            //game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            //	+ lots of other required assets here
            //game.load.image( 'logo', 'assets/phaser.png' );
			game.load.atlas("newGameButton", "assets/newGameButton.png", "assets/newGameButton.json");
			
			game.load.image("red", "assets/red.png", 32, 32);
			game.load.image("blue", "assets/blue.png", 32, 32);
			game.load.image("yellow", "assets/yellow.png", 32, 32);
			game.load.image("green", "assets/green.png", 32, 32);
			game.load.image("cyan", "assets/cyan.png", 32, 32);
			game.load.image("purple", "assets/purple.png", 32, 32);
			game.load.tilemap("map_demo", "assets/demo.json", null, Phaser.Tilemap.TILED_JSON);
			game.load.image("maptiles", "assets/map_tiles.png");
			game.load.image("maparrows", "assets/map_arrows.png");
			
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
			// preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            //if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            //{
            //  ready = true;
                game.state.start('MainMenu');
            //}
    
        }
    
    };
};
