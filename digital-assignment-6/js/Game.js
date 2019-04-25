"use strict";
	
GameStates.makeGame = function( game, shared ) {
	
	// Cards
	var cards;
	
	
	// Integers
	var roundNumber;
	
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
	var texts;
	var infoText;
	var roundText;
	//var textRollNumber;
	
	// Groups
	var overlay;
	
	// Tweens
	var openTween;
	var closeTween;
	
	// Lists
	var player_list = [];
	var deck = [];
	var board = [];
	
	
	// Misc Variables
	var layer;
	var map;
	var style;
	var card;
    var roll;
	
	
	function Card(id) {
		return {
			name: cards.cards[id].name,
			image: cards.cards[id].image,
			score: cards.cards[id].score,
			effect: cards.cards[id].effect,
			description: cards.cards[id].description
		};
	}
	
	function Player(id) {
		return {
			id: id,
			name: "Player " + id,
			hand: []
		};
	}
	
	
    
	function gameSetup() {
		UISetup();
		setupInfo();
		setupDeck();
		setupPlayer();
		setupBoard();
	}

	function UISetup() {
			
		// UI Setup
		style = { font: "32px Arial", fill: "#000", align: "center" };
		
		/*
		backArrow = game.add.button( 750, 30, 'backArrow', quitGame, this, 'over', 'out', 'down');
		backArrow.anchor.set(0.5, 0.5);
		*/		
		
		roundNumber = 0;
		roundText = game.add.text( 775, 10, "Round: " + roundNumber, {font: "48px Arial", fill: "#fff", align: "center"});
		roundText.anchor.set(1, 0);
		
		helpButton = game.add.button( 775, 80, "helpButton", openInfo, this, "over", "out", "down");
		helpButton.anchor.set(1, 0);	
		
		/*
		textRollNumber = game.add.text(250, 500, "", {font: "1px Arial", fill: "#d6d6d6", align: "center" });
		textRollNumber.anchor.set(0, 0.5);	
		*/
		
		overlay = game.add.group();		
	}
	
	
	function setupDeck() {
		for (var cardsIndex = 0; cardsIndex < cards.cards.length; cardsIndex++) {
			for (var numCard = 0; numCard < cards.cards[cardsIndex].startNumber; numCard++) {
				deck.push(new Card(cardsIndex));
			}
		}
		
		var i, j, k;
		
		for (i = deck.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			k = deck[i];
			deck[i] = deck[j];
			deck[j] = k;
		}
	}
	
	function setupPlayer() {
		for (var i = 0; i < 4; i++) {
			player_list = new Player(i);
			//player_list[i].hand.append(deck.pop());
		}
	}
	
	function setupBoard() {
		while (board.length < 8) {
			board.push(deck.pop());
		}
		
	}
	
	
	function setupInfo() {
		infoBox = game.add.sprite(0, 0, "infoBox");
		infoBox.anchor.setTo(0);
		infoText = game.add.text(25, 50, texts.infoText, { font: "32px Arial", fill: "#000", align: "left"});
		
		infoBox.visible = false;
		overlay.add(infoBox);
		overlay.add(infoText);
		game.world.bringToTop(overlay);
		infoText.anchor.set(0);
		infoText.visible = false;
		closeButton = game.add.button( 700, 50, "closeButton", closeInfo, null, "over", "out", "down");
		closeButton.visible = false;	
	}
	
	function openInfo() {
		infoBox.visible = true;
		openTween = game.add.tween(infoBox.scale).to({x: 160, y: 200}, 1000, Phaser.Easing.Exponential.Out, true);
		//textRollNumber.visible = false;
		openTween.onComplete.add(showInfo, this);
	}
	
	function showInfo() {
		infoText.visible = true;
		closeButton.visible = true;
		closeButton.inputEnabled = true;
		
		//rollButton.inputEnabled = false;
		helpButton.inputEnabled = false;
	}
	
	function closeInfo(){
		if (openTween && openTween.isRunning || infoBox.scale == 0) {
			return;
		}

		closeTween = game.add.tween(infoBox.scale).to({x: 0, y: 0}, 500, Phaser.Easing.Exponential.In, true);
		
		infoBox.visible = false;
		infoText.visible = false;
		closeButton.visible = false;
		closeButton.inputEnabled = false;
		//rollButton.inputEnabled = true;
		//textRollNumber.visible = true;
		helpButton.inputEnabled = true;
	}
	
	function gameOver() {
		shared.loseGame = true;
		var over = game.add.text(400, 300, "GAME OVER", {font: "120px Arial", fill: "#f00", align: "center"});
	}
	
	/*
	function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
	*/
	
    return {
		
		preload: function () {
			texts = game.cache.getJSON("textJSON");
		},
    
        create: function () {
			cards = game.cache.getJSON("cardListJSON");
			
			gameSetup();
			
			//console.log(cards.cards[1].image);
			//console.log(cards.cards[4].image == "");

		},
		
        update: function () {
		}
    };
};
