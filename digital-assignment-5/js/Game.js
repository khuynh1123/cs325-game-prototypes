"use strict";
	
GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    
	var card;
	var deck;
	var flip;
	var roll;
	
	var layer;
	var map;
	
	var playerTurn = 1;
	// var countdownTimer = 30; Lower for testing
	var countdownTimer = 10;
	
	var backArrow;
	var rollButton;
	var style;
	var textRollNumber;
	var textCountdownNumber;	
	
	
	var playerOne;
	var playerOneIndex;
	var playerTwo;
	var playerTwoIndex;
	
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
			textCountdownNumber = game.add.text(575, 30, "Countdown " + countdownTimer, style);
			textCountdownNumber.anchor.set(0.5, 0);
			
			rollButton = game.add.button(50, 500, "red", rollClick, this);
		
			textRollNumber = game.add.text(100, 500, "", {font: "1px Arial", fill: "#d6d6d6", align: "center" });
			
			backArrow = game.add.button( 750, 30, 'backArrow', quitGame, this, 'over', 'out', 'down');
			backArrow.anchor.set(0.5, 0);
	}
	
	function playerSetup() {
		playerOne = game.add.sprite(64 * 4, 64 * 4 + 4, "red");
		playerOne.anchor.setTo(1);
		playerOneIndex = 0;
		
		
		playerTwo = game.add.sprite(64 * 3, 64 * 3, "blue");
		playerTwo.anchor.setTo(0);
		playerTwoIndex = 0;
		
		
	}

	
	function rollClick() {
		roll = Math.floor(Math.random() * 6) + 1;
		textRollNumber.destroy();
		textRollNumber = game.add.text(100, 500, "Player " + playerTurn + " rolled a " + roll + ".", {font: "32px Arial", fill: "#000", align: "center"});
		
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
		console.log("Index one: " + playerOneIndex);
		console.log("Index two: " + playerTwoIndex);
		
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
	
	function gameOver() {
		shared.loseGame = true;
		var over = game.add.text(400, 300, "GAME OVER", {font: "120px Arial", fill: "#f00", align: "center"});
		over.anchor.set(0.5);
		rollButton.inputEnabled = false;
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
