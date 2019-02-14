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
	var roll;
	
	var layer;
	var map;
	
	var playerOne;
	var playerTwo;
	var playerThree;
	var playerFour;
	var roundNumber = 1;
	
	var rollButton;
	var style;
	var textRollNumber;
	var textRoundNumber;
    
	
    function preload() {
        
        game.load.image("red", "assets/red.png", 32, 32);
		game.load.image("blue", "assets/blue.png", 32, 32);
		game.load.image("yellow", "assets/yellow.png", 32, 32);
		game.load.image("green", "assets/green.png", 32, 32);
		game.load.image("cyan", "assets/cyan.png", 32, 32);
		game.load.image("purple", "assets/purple.png", 32, 32);
		game.load.tilemap("map_demo", "assets/demo.json", null, Phaser.Tilemap.TILED_JSON);
		game.load.image("maptiles", "assets/map_tiles.png");
		game.load.image("maparrows", "assets/map_arrows.png");
		
		
		
		class Deck {
			constructor() {
				
			}
			
		}
    }
	
	
    function create() {
		
		// Board setup
		game.stage.backgroundColor = "#d6d6d6";
		map = game.add.tilemap("map_demo");
		map.addTilesetImage("map_tiles", "maptiles");
		map.addTilesetImage("map_arrows", "maparrows");
		layer = map.createLayer("board");
		layer.scale.set(2);
		layer.resizeWorld();
		
		// UI Setup
		style = { font: "32px Arial", fill: "#000", align: "center" };
		textRoundNumber = game.add.text(550, 50, "Round " + roundNumber, style);
		textRoundNumber.anchor.set(0.5);
		
		rollButton = game.add.button(50, 500, "red", rollClick, this);
		//sidebar = game.make.bitmapData(
		
		
		// Player setup
		
		//card.anchor.setTo(0.5, 0.5);
		
		
		// Input setup
		
		playerOne = game.add.sprite(64 * 4 - 20, 64 * 4 - 12, "red");
		playerOne.anchor.setTo(.5, .5);
		
		
    }
    
    function update() {
		
	}
	
	function rollClick() {
		roll = game.rnd.integerInRange(1, 6);
		textRollNumber = game.add.text(100, 500, "You rolled " + roll, style);
	}
};