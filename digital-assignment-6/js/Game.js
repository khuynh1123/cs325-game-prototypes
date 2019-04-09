"use strict";
	
GameStates.makeGame = function( game, shared ) {
	
	// Integers
	var playerTurn;
	var countdownTimer;
	
	// Buttons
	var backArrow;
	var helpButton;
	var cluesButton;
	var rollButton;
	var closeButton;
	var questionButton;
	
	// Boxes
	var infoBox;
	var itemBox;
	
	// Text
	var infoText;
	var clueText;
	var textRollNumber;
	var textCountdownNumber;	
	
	// Groups
	var overlay;
	var mapGroup;
	var materialGroup;
	
	// Tweens
	var openTween;
	var closeTween;
	
	var player_list = [];
	
	
	// Misc Variables
	var layer;
	var map;
	var style;
	var card;
    var roll;
	var deck = [];
	var availableMaterials = [];
	var collectedMaterials = [];
	var availableClues = [];
	var collectedClues = [];
	var choiceList = [];
	
	
	
	
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
	
	function gameSetup() {
		UISetup();
		materialSetup();
		clueSetup();
		mapSetup();
		boardSetup();
		playerSetup();
		setupInfo();
	}
	
	function mapSetup() {
		//game.stage.backgroundColor = "#696969";
		game.stage.backgroundColor = "#847e87";
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
		countdownTimer = 10;
		textCountdownNumber = game.add.text(675, 30, "Countdown: " + countdownTimer, style);
		textCountdownNumber.anchor.set(1, 0.5);
		
		backArrow = game.add.button( 750, 30, 'backArrow', quitGame, this, 'over', 'out', 'down');
		backArrow.anchor.set(0.5, 0.5);
		
		helpButton = game.add.button( 725, 80, "helpButton", openInfo, this, "over", "out", "down");
		helpButton.anchor.set(0.5, 0);
		
		cluesButton = game.add.button( 550, 80, "cluesButton", showClues, this, "over", "out", "down");
		cluesButton.anchor.set(0.5, 0);
		
		overlay = game.add.group();
		mapGroup = game.add.group();
		materialGroup = game.add.group();
		
		rollButton = game.add.button(25, 500, "rollButton", rollClick, this, "over", "out", "down");
		rollButton.anchor.set(0, 0);
		
		
		textRollNumber = game.add.text(250, 500, "", {font: "1px Arial", fill: "#d6d6d6", align: "center" });
		textRollNumber.anchor.set(0, 0.5);		
	}
	
	function openInfo() {
		infoBox.alpha = 1;
		openTween = game.add.tween(infoBox.scale).to({x: 160, y: 200}, 1000, Phaser.Easing.Exponential.Out, true);
		textRollNumber.alpha = 0;
		openTween.onComplete.add(showInfo, this);
	}
	
	function showInfo() {
		infoText.alpha = 1;
		closeButton.alpha = 1;
		closeButton.inputEnabled = true;
		
		rollButton.inputEnabled = false;
		helpButton.inputEnabled = false;
	}
	
	function closeInfo(){
		if (openTween && openTween.isRunning || infoBox.scale == 0) {
			return;
		}

		closeTween = game.add.tween(infoBox.scale).to({x: 0, y: 0}, 500, Phaser.Easing.Exponential.In, true);
		
		infoBox.alpha = 0;
		infoText.alpha = 0;
		closeButton.alpha = 0;
		closeButton.inputEnabled = false;
		rollButton.inputEnabled = true;
		textRollNumber.alpha = 1;
		helpButton.inputEnabled = true;
	}
	
	function gameOver() {
		shared.loseGame = true;
		var over = game.add.text(400, 300, "GAME OVER", {font: "120px Arial", fill: "#f00", align: "center"});
		over.anchor.set(0.5);
		rollButton.inputEnabled = false;
		helpButton.inputEnabled = false;
		materialGroup.inputEnableChildren = false;
		//game.state.start("PostScreen");
	}
	
	function shuffleDeck() {
		
	}
	
    return {
		
		preload: function () {
		},
    
        create: function () {
			gameSetup();			

		},
		
        update: function () {
    }
    };
};
