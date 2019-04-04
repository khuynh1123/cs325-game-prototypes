"use strict";
	
GameStates.makeGame = function( game, shared ) {
	
	function addNewPlayer {
		playerMap[id] = game.add.sprite(x, y, "sprite");
	}
	
	function movePlayer(id, x, y) {
		var player = playerMap[id];
		var distance = Phaser.Math.distance(player.x, player.y, x, y);
		var duration = distance * 10;
		var tween = game.add.tween(player);
		
		tween.to({x:x, y:y}, duration);
		tween.start();
	}
		
    return {
		
		preload: function () {
			
		},
    
        create: function () {
			
			playerMap = {};
			map = game.add.tilemap("map");
			map.addTilesetImage("tilesheet", "tileset");
			
			for(var i = 0; i < map.layers.length; i++) {
				layer = map.createLayer(i);
			}			
			
			layer.inputEnabled = true;
			Client.askNewPlayer();
		},
		
        update: function () {
    }
    };
};
