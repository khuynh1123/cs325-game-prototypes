"use strict";
	
GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    
	var card;
	var deck;
	var flip;
	var roll;
	
	var layer;
	var map;
	
	var playerList = [];
	var playerTurn = 1;
	var roundNumber = 1;
	
	var rollButton;
	var style;
	var textRollNumber;
	var textRoundNumber;	
	
	var deck = [];
	
	//	3 1 1 2 1 1 3
	//  1     1     1
	//  1     1     1
	//  2 1 1 0 1 1 2
	//  1     1     1
	//  1     1     1
	//  3 1 1 2 1 1 3
	//
	
	// Each lap: 0, 1, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 0
	
	var board = [0,
				1, 1, 2,
				1, 1, 3,
				1, 1, 2,
				1, 1, 0,
				
				1, 1, 2,
				1, 1, 3,
				1, 1, 2,
				1, 1, 0,
				
				1, 1, 2,
				1, 1, 3,
				1, 1, 2,
				1, 1, 0,
				
				1, 1, 2,
				1, 1, 3,
				1, 1, 2,
				1, 1
				];
	
	
	var addPlayerDone = false;
	
	Player = function (game, x, y) {
		this.name = "Player " + playerList.length;
		
		switch (playerList.length) {
			case 0:
				color = "red";
				break;
			case 1:
				color = "blue";
				break;
			case 2:
				color = "yellow";
				break;
			case 3:
				color = "green";
				break;
			default:
			color = "purple";
	}
	
	Phaser.Sprite.call(this, game, x, y, color);
	this.tileIndex = tileIndex;
}
	
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
	
	function gameSetup() {
		mapSetup();
		boardSetup();
		UISetup();
		shuffleDeck();
		playerSetup();		
	}
	
	function mapSetup() {
            game.stage.backgroundColor = "#d6d6d6";
			map = game.add.tilemap("map_demo");
			map.addTilesetImage("map_tiles", "maptiles");
			map.addTilesetImage("map_arrows", "maparrows");
			layer = map.createLayer("board");
			layer.scale.set(2);
			layer.resizeWorld();		
	}
	
	function boardSetup() {
		
	}

	function UISetup() {
			
			// UI Setup
			style = { font: "32px Arial", fill: "#000", align: "center" };
			textRoundNumber = game.add.text(550, 50, "Round " + roundNumber, style);
			textRoundNumber.anchor.set(0.5);
			
			rollButton = game.add.button(50, 500, "red", rollClick, this);
		
			textRollNumber = game.add.text(100, 500, "", {font: "1px Arial", fill: "#d6d6d6", align: "center" });
	}
	
	function playerSetup() {
		if (playerList.length < 3 && !addPlayerDone) {
			addPlayerButton = game.add.button(550, 100, "blue", addPlayer, this);
			donePlayerButton = game.add.button(600, 100, "green", donePlayer, this);
		}
	}
	
	function addPlayer() {
		var player = new Player(this, game, 64 * 4 - 20, 64 * 4 - 12);
		playerList.push(player);
	}
	
	function donePlayer() {
		addPlayerDone = true;
		for (var i = 0; i < playerList.length; i++) {
			console.log(playerList[i].name + " is at tile " + playerList[i].tileIndex);
		}
	}
	
	function rollClick() {
		roll = Math.floor(Math.random() * 6) + 1;
		textRollNumber.destroy();
		textRollNumber = game.add.text(100, 500, "Player " + playerTurn + " rolled a " + roll + ".", {font: "32px Arial", fill: "#000", align: "center"});
	}
	
    
	function shuffleDeck() {
		
	}
	
    return {
		
		preload: function () {
			
		},
    
        create: function () {
			
			// Player setup
			
			//card.anchor.setTo(0.5, 0.5);
			
			
			// Input setup
			
			playerOne = game.add.sprite(64 * 4 - 20, 64 * 4 - 12, "red");
			playerOne.anchor.setTo(.5, .5);
			

			gameSetup();
		},
		
        update: function () {
    }
    };
};
