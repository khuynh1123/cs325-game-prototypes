"use strict";
	
GameStates.makeGame = function( game, shared ) {
	
	// Integers
	var playerTurn = 1;
	// var countdownTimer = 30; Lower for testing
	var countdownTimer = 10; // debug
	
	// Buttons
	var backArrow;
	var helpButton;
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
	
	// Player 1
	var playerOne;
	var playerOneIndex;
	
	// Player 2
	var playerTwo;
	var playerTwoIndex;
	
	// Materials
	var materialTome;
	var materialRing;
	var materialTwig;
	var materialThread;
	var materialDagger;
	var materialCandle;
	
	//	3 1 1 2 1 1 3
	//  1     1     1
	//  1     1     1
	//  2 1 1 0 1 1 2
	//  1     1     1
	//  1     1     1
	//  3 1 1 2 1 1 3
	//
	
	// Each lap: 0, 1, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 0
	
	
	// Misc Variables
	var layer;
	var map;
	var style;
	var card;
    var roll;
	var deck = [];
	var availableMaterials = [];
	var collectedMaterials = [];
	var clueList = [];
	var choiceList = [];
	
	
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
	
	
	
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
	
	function gameSetup() {
		UISetup();
		materialSetup();
		mapSetup();
		boardSetup();
		playerSetup();
		setupInfo();
		// Shuffle setup
		// shuffleDeck();
		// shuffleMaterials();
		// shuffleClues();
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
		textCountdownNumber = game.add.text(675, 30, "Countdown: " + countdownTimer, style);
		textCountdownNumber.anchor.set(1, 0.5);
		
		backArrow = game.add.button( 750, 30, 'backArrow', quitGame, this, 'over', 'out', 'down');
		backArrow.anchor.set(0.5, 0.5);
		
		helpButton = game.add.button( 725, 80, "helpButton", openInfo, this, "over", "out", "down");
		helpButton.anchor.set(0.5, 0);
		overlay = game.add.group();
		mapGroup = game.add.group();
		materialGroup = game.add.group();
		
		rollButton = game.add.button(25, 500, "rollButton", rollClick, this, "over", "out", "down");
		rollButton.anchor.set(0, 0);
		
		
		textRollNumber = game.add.text(250, 500, "", {font: "1px Arial", fill: "#d6d6d6", align: "center" });
		textRollNumber.anchor.set(0, 0.5);		
	}
	
	function materialSetup() {
			
		materialGroup.inputEnableChildren = true;
			
		materialTome = game.add.sprite(700, 200, "materialTome");
		materialTome.scale.setTo(0.75);
		materialTome.anchor.set(0);
		
		materialRing = game.add.sprite(700, 200, "materialRing");
		materialRing.scale.setTo(0.75);
		materialRing.anchor.set(1, 0);
		
		materialTwig = game.add.sprite(700, 300, "materialTwig");
		materialTwig.scale.setTo(0.75);
		materialTwig.anchor.set(0);
		
		materialThread = game.add.sprite(700, 300, "materialThread");
		materialThread.scale.setTo(0.75);
		materialThread.anchor.set(1, 0);
		
		materialDagger = game.add.sprite(700, 400, "materialDagger");
		materialDagger.scale.setTo(0.75);
		materialDagger.anchor.set(0);
		
		materialCandle = game.add.sprite(700, 400, "materialCandle");
		materialCandle.scale.setTo(0.75);
		materialCandle.anchor.set(1, 0);
		
		materialGroup.add(materialTome);
		materialGroup.add(materialRing);
		materialGroup.add(materialTwig);
		materialGroup.add(materialThread);
		materialGroup.add(materialDagger);
		materialGroup.add(materialCandle);
		materialGroup.alpha = 0.25;
		
		materialGroup.onChildInputOver.add(materialOver, this);
		materialGroup.onChildInputOut.add(materialOut, this);
		materialGroup.onChildInputDown.add(materialDown, this); // Modify
	}
	
	function materialOver(sprite) {
		if (sprite.alpha < 4) {
			sprite.alpha = 4;
		}
		
	}
	
	function materialOut(sprite) {
		sprite.alpha /= 4;
		if (collectedMaterials.includes(sprite)) {
			 sprite.alpha = 4;
		} else {
			sprite.alpha = 1;
		}
	}
	
	function materialDown(sprite) {
		if (collectedMaterials.includes(sprite)) {
			var index = choiceList.indexOf(sprite);
			if (index != -1) {
				choiceList.splice(index, 1);
			} else if (choiceList < 3) {
				choiceList.push(sprite);
			}
		}
	}
	
	function materialChoice(sprite) {
		
	}
	
	function playerSetup() {
		playerOne = game.add.sprite(64 * 4, 64 * 4 + 4, "red");
		playerOne.anchor.setTo(1);
		playerOneIndex = 0;
		
		
		playerTwo = game.add.sprite(64 * 3, 64 * 3, "blue");
		playerTwo.anchor.setTo(0);
		playerTwoIndex = 0;
		
		mapGroup.add(playerOne);
		mapGroup.add(playerTwo);
		
		game.world.bringToTop(mapGroup);
	}

	
	function rollClick() {
		roll = Math.floor(Math.random() * 6) + 1;
		textRollNumber.destroy();
		textRollNumber = game.add.text(150, 500, "Player " + playerTurn + " rolled a " + roll + ".", {font: "32px Arial", fill: "#000", align: "center"});
		
		if (playerTurn == 1) {
			if (playerOneIndex + roll > board.length) {
				playerOneIndex = playerOneIndex + roll - board.length;
				countDown();
			} else {
				if ((playerOneIndex % 12) + roll > 12 || (playerOneIndex % 12 == 0 && !playerOneIndex == 0)) {
					countDown();
				}
				playerOneIndex += roll;
			}
		}
		
		if (playerTurn == 2) {
			if (playerTwoIndex + roll > board.length) {
				playerTwoIndex = playerTwoIndex + roll - board.length;
				countDown();
			} else {
				if ((playerTwoIndex % 12) + roll > 12 || (playerTwoIndex % 12 == 0 && !playerTwoIndex == 0)) {
					countDown();
				}
				playerTwoIndex += roll;
			}
		}
		
		updatePlayer(playerTurn);
		playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;
	}
	
	function updatePlayer(number) {
		var x = 0;
		var y = 0;
		if (number == 1) {
			switch (playerOneIndex) {
				
				case 1:
				case 25:
					playerOne.x = 64 * 4;
					playerOne.y = 64 * 3 + 4;
					break;					
				case 2:
				case 26:
					playerOne.x = 64 * 4;
					playerOne.y = 64 * 2 + 4;
					break;
				case 3:
				case 27:
					playerOne.x = 64 * 4;
					playerOne.y = 64 + 4;
					break;
				case 4:
					playerOne.x = 64 * 5;
					playerOne.y = 64 + 4;
					break;
				case 5:
					playerOne.x = 64 * 6;
					playerOne.y = 64 + 4;
					break;
				case 6:
					playerOne.x = 64 * 7;
					playerOne.y = 64 + 4;
					break;
				case 7:
					playerOne.x = 64 * 7;
					playerOne.y = 64 * 2 + 4;
					break;
				case 8:
					playerOne.x = 64 * 7;
					playerOne.y = 64 * 3 + 4;
					break;
				case 9:
				case 39:
					playerOne.x = 64 * 7;
					playerOne.y = 64 * 4 + 4;
					break;
				case 10:
				case 38:
					playerOne.x = 64 * 6;
					playerOne.y = 64 * 4 + 4;
					break;
				case 11:
				case 37:
					playerOne.x = 64 * 5;
					playerOne.y = 64 * 4 + 4;
					break;
				case 13:
				case 35:
					playerOne.x = 64 * 3;
					playerOne.y = 64 * 4 + 4;
					break;					
				case 14:
				case 34:
					playerOne.x = 64 * 2;
					playerOne.y = 64 * 4 + 4;
					break;
				case 15:
				case 33:
					playerOne.x = 64;
					playerOne.y = 64 * 4 + 4;
					break;
				case 16:
					playerOne.x = 64;
					playerOne.y = 64 * 5 + 4;
					break;
				case 17:
					playerOne.x = 64;
					playerOne.y = 64 * 6 + 4;
					break;
				case 18:
					playerOne.x = 64;
					playerOne.y = 64 * 7 + 4;
					break;
				case 19:
					playerOne.x = 64 * 2;
					playerOne.y = 64 * 7 + 4;
					break;
				case 20:
					playerOne.x = 64 * 3;
					playerOne.y = 64 * 7 + 4;
					break;
				case 21:
				case 45:
					playerOne.x = 64 * 4;
					playerOne.y = 64 * 7 + 4;
					break;
				case 22:
				case 46:
					playerOne.x = 64 * 4;
					playerOne.y = 64 * 6 + 4;
					break;
				case 23:
				case 47:
					playerOne.x = 64 * 4;
					playerOne.y = 64 * 5 + 4;
					break;
				case 28:
					playerOne.x = 64 * 3;
					playerOne.y = 64 + 4;
					break;
				case 29:
					playerOne.x = 64 * 2;
					playerOne.y = 64 + 4;
					break;
				case 30:
					playerOne.x = 64;
					playerOne.y = 64 + 4;
					break;
				case 31:
					playerOne.x = 64;
					playerOne.y = 64 * 2 + 4;
					break;
				case 32:
					playerOne.x = 64;
					playerOne.y = 64 * 3 + 4;
					break;
				case 40:
					playerOne.x = 64 * 7;
					playerOne.y = 64 * 5 + 4;
					break;
				case 41:
					playerOne.x = 64 * 7;
					playerOne.y = 64 * 6 + 4;
					break;
				case 42:
					playerOne.x = 64 * 7;
					playerOne.y = 64 * 7 + 4;
					break;
				case 43:
					playerOne.x = 64 * 6;
					playerOne.y = 64 * 7 + 4;
					break;
				case 44:
					playerOne.x = 64 * 5;
					playerOne.y = 64 * 7 + 4;
					break;
					
				case playerOneIndex % 12 == 0:
				default:
					playerOne.x = 64 * 4;
					playerOne.y = 64 * 4 + 4;
			}
			
			
		}
		
		if (number == 2) {
			switch (playerTwoIndex) {
				
				case 1:
				case 25:
					playerTwo.x = 64 * 3;
					playerTwo.y = 64 * 2;
					break;					
				case 2:
				case 26:
					playerTwo.x = 64 * 3;
					playerTwo.y = 64;
					break;
				case 3:
				case 27:
					playerTwo.x = 64 * 3;
					playerTwo.y = 0;
					break;
				case 4:
					playerTwo.x = 64 * 4;
					playerTwo.y = 0;
					break;
				case 5:
					playerTwo.x = 64 * 5;
					playerTwo.y = 0;
					break;
				case 6:
					playerTwo.x = 64 * 6;
					playerTwo.y = 0;
					break;
				case 7:
					playerTwo.x = 64 * 6;
					playerTwo.y = 64;
					break;
				case 8:
					playerTwo.x = 64 * 6;
					playerTwo.y = 64 * 2;
					break;
				case 9:
				case 39:
					playerTwo.x = 64 * 6;
					playerTwo.y = 64 * 3;
					break;
				case 10:
				case 38:
					playerTwo.x = 64 * 5;
					playerTwo.y = 64 * 3;
					break;
				case 11:
				case 37:
					playerTwo.x = 64 * 4;
					playerTwo.y = 64 * 3;
					break;
				case 13:
				case 35:
					playerTwo.x = 64 * 2;
					playerTwo.y = 64 * 3;
					break;					
				case 14:
				case 34:
					playerTwo.x = 64;
					playerTwo.y = 64 * 3;
					break;
				case 15:
				case 33:
					playerTwo.x = 0;
					playerTwo.y = 64 * 3;
					break;
				case 16:
					playerTwo.x = 0;
					playerTwo.y = 64 * 4;
					break;
				case 17:
					playerTwo.x = 0;
					playerTwo.y = 64 * 5;
					break;
				case 18:
					playerTwo.x = 0;
					playerTwo.y = 64 * 6;
					break;
				case 19:
					playerTwo.x = 64;
					playerTwo.y = 64 * 6;
					break;
				case 20:
					playerTwo.x = 64 * 2;
					playerTwo.y = 64 * 6;
					break;
				case 21:
				case 45:
					playerTwo.x = 64 * 3;
					playerTwo.y = 64 * 6;
					break;
				case 22:
				case 46:
					playerTwo.x = 64 * 3;
					playerTwo.y = 64 * 5;
					break;
				case 23:
				case 47:
					playerTwo.x = 64 * 3;
					playerTwo.y = 64 * 4;
					break;
				case 28:
					playerTwo.x = 64 * 2;
					playerTwo.y = 0;
					break;
				case 29:
					playerTwo.x = 64;
					playerTwo.y = 0;
					break;
				case 30:
					playerTwo.x = 0;
					playerTwo.y = 0;
					break;
				case 31:
					playerTwo.x = 0;
					playerTwo.y = 64;
					break;
				case 32:
					playerTwo.x = 0;
					playerTwo.y = 64 * 2;
					break;
				case 40:
					playerTwo.x = 64 * 6;
					playerTwo.y = 64 * 4;
					break;
				case 41:
					playerTwo.x = 64 * 6;
					playerTwo.y = 64 * 5;
					break;
				case 42:
					playerTwo.x = 64 * 6;
					playerTwo.y = 64 * 6;
					break;
				case 43:
					playerTwo.x = 64 * 5;
					playerTwo.y = 64 * 6;
					break;
				case 44:
					playerTwo.x = 64 * 4;
					playerTwo.y = 64 * 6;
					break;
					
				case playerTwoIndex % 12 == 0:
				default:
					playerTwo.x = 64 * 3;
					playerTwo.y = 64 * 3;
			}
			
			
		}
		
		
	}
    
	function countDown() {
		countdownTimer--;
		textCountdownNumber.setText("Countdown " + countdownTimer);
		
		if (countdownTimer == 0) {
			gameOver();
		}
	}
	
	function setupInfo() {
		infoBox = game.add.sprite(0, 0, "infoBox");
		infoBox.anchor.setTo(0);
		infoText = game.add.text(25, 50, "\n\
		Stop the end of the world as we know it!                \n\
		Collect materials to create the catalyst to\n\
		stop the portal from opening.  Obtain clues to\n\
		find the correct combination of three materials\n\
		before the countdown reaches zero!\n\
		", { font: "32px Arial", fill: "#000", align: "left"});
		
		infoBox.alpha = 0;
		overlay.add(infoBox);
		overlay.add(infoText);
		game.world.bringToTop(overlay);
		infoText.anchor.set(0);
		infoText.alpha = 0;
		closeButton = game.add.button( 700, 50, "closeButton", closeInfo, null, "over", "out", "down");
		closeButton.alpha = 0;			
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
		//game.state.start("PostScreen");
	}
	
	function shuffleDeck() {
		
	}
	
    return {
		
		preload: function () {
			
		},
    
        create: function () {
			
			gameSetup();
			
			
			// Input setup
			
			

		},
		
        update: function () {
    }
    };
};
