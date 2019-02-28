"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var loadingText = null;

	var ready = false;

    return {
    
        preload: function () {
			game.load.image('roomBackground', 'assets/roomBackground.png');
            game.load.atlas('storyButton', 'assets/storyButton.png', 'assets/storyButton.json');
            game.load.atlas('backArrow', 'assets/backArrow.png', 'assets/backArrow.json');
            game.load.atlas('statsButton', 'assets/statsButton.png', 'assets/statsButton.json');
			game.load.audio("crunch", "assets/crunch.mp3");
            game.load.audio('nightMusic', ['assets/nightMusic.wav']);
    		game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/BlurX.js');
			game.load.image("maptiles", "assets/platformtilesheet.png");
			game.load.image("foregroundtiles", "assets/foregroundtilemap.png");
			game.load.tilemap("map", "assets/map_story1.json", null, Phaser.Tiled.TILED_JSON);
			game.load.spritesheet("player", "assets/cat.png", 70, 55);
        },
    
        create: function () {
			loadingText = game.add.text(700, 500, "Loading...", {font: "32px Arial", fill: "#ffffff", align: "right"});
        },
    
        update: function () {
            if (game.cache.isSoundDecoded('nightMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
