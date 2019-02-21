"use strict";

BasicGame.Game = function (game) {

    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
	
	var alphabet;
	var countdown;
	var letterGroup;
	var letterList;
	var timeText;
	var winCheck = false;
	var word;
	var wordBitmap;
	var wordList
	
	this.music = null;
};

BasicGame.Game.prototype = {

    create: function () {        
		
		this.alphabet = [
			"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
			"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
		];
		
		this.letterGroup = this.game.add.group();
		this.letterGroup.inputEnableChildren = true;
		this.letterGroup.onChildInputOver.add(this.touchLetter, this);
		
		
		
		this.wordList = [
			"EARTHY", "STRONG", "EXPLAIN", "IMPLANT", "NOTIFY", "BASHFUL", "IMPLODE",
			"DINOSAUR", "TANGIBLE", "ACTION", "QUESTION", "HYDRANT", "FLOWERS", "HANDSOME"
		];
		
		this.word = this.wordList[Math.floor(Math.random() * 14)];
		this.letterList = [];
		
		for (var i = 0; i < this.word.length; i++) {
			this.letterList[this.word[i].toLowerCase()] = false;
		}
		
		this.music = this.add.audio("gameMusic");
		this.music.loop = true;
		this.music.play();

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.wordBitmap = this.make.bitmapData(500, 100);
		this.wordBitmap.context.font = "48px Lucida Console";
		this.wordBitmap.context.fillStyle = "#696969";
		this.wordBitmap.context.fillText(this.word, 48, 48);
		this.wordBitmap.addToWorld();
		
		var pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		pauseKey.onDown.add(this.pauseFunction, this);
		
		this.countdown = 120;
		this.timeText = this.game.add.text(500, 20, "Time remaining: 2:00", {font: "30px Arial", fill: "#FFF"});
		this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
		this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 240, this.spawnLetter, this);
    },
	
    update: function () {
		
    },

	spawnLetter: function() {
		
		var randomInt = Math.floor(Math.random() * 360);
		var newLetter = this.game.add.text(this.game.world.centerX + Math.floor(Math.sin(randomInt) * 400), this.game.world.centerY + Math.floor(Math.cos(randomInt) * 400), "" + this.alphabet[Math.floor(Math.random() * 26)], {font: "32px Arial", fill: "#ffffff", align: "center"});
		
		this.game.physics.arcade.enable(newLetter);
		newLetter.anchor.setTo(0.5);
		newLetter.body.velocity.setTo(this.game.world.centerX - newLetter.position.x,this.game.world.centerY - newLetter.position.y);
		
		
		
		this.letterGroup.add(newLetter);
	},
	
	touchLetter: function(sprite) {
		if (!this.game.paused) {
			console.log("Letter touched: " + sprite.text);
			sprite.destroy();
			
			var letterConsume = false;
			this.wordBitmap.cls();
			this.winCheck = true;
			var x = 48;
			for (var i = 0; i < this.word.length; i++) {
				if (sprite.text == this.word.charAt(i)) {
					this.letterList[this.word.charAt(i)] = true;
					letterConsume = true;
				}
				
				if (this.letterList[this.word.charAt(i)]) {
					this.wordBitmap.context.fillStyle = "#ffff00";
				} else {
					this.wordBitmap.context.fillStyle = "#696969";
					this.winCheck = false;
				}
				
				this.wordBitmap.context.fillText(this.word.charAt(i), x, 48);
				x += this.wordBitmap.context.measureText(this.word.charAt(i)).width;
			}
			
			if (this.winCheck == true) {
				this.endWin();
			}
			
			if (letterConsume == false) {
				this.endLoss();
			}
		}
	},
	
	updateTimer: function() {
		this.countdown--;
		
		
		if (this.countdown > 60) {
			var minutes = Math.floor(this.countdown / 60);
			var timeString = minutes + ":" + (this.countdown - (minutes * 60));
		} else {
			var timeString = this.countdown;
		}
		
		this.timeText.text = "Time remaining: " + timeString;
		
		if (this.countdown == 0) {
			this.endLoss();
		}
		
	},
	
	pauseFunction: function () {
		this.game.paused ? this.game.paused = false : this.game.paused = true;
		this.timeText.text = "Game is paused";
		console.log("The game is " + (this.game.paused ? "paused" : "unpaused") + "\n");
	},

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
	
	shutdown: function () {
		this.music.stop();
		this.wordBitmap.destroy();
		this.letterGroup.destroy();
	},
	
	endLoss: function () {
		this.state.start("LoseScreen");
	},

    endWin: function () {
        this.state.start("WinScreen");
    }

};
