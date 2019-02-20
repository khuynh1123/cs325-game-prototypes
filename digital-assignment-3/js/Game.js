"use strict";

BasicGame.Game = function (game) {

    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
	var wordBitmap;
	var word;
	var letterList;
	
};

BasicGame.Game.prototype = {

    create: function () {        
		
		
		var wordList = [
			"EARTHY", "STRONG", "EXPLAIN", "IMPLANT", "NOTIFY", "BASHFUL", "IMPLODE",
			"DINOSAUR", "DISFUNCTIONAL", "ACTION", "QUESTION", "HYDRANT", "FLOWERS", "HANDSOME"
		];
		
		var randInt = Math.floor(Math.random() * 14);
		this.word = wordList[randInt];
		this.letterList = [];
		
		for (var i = 0; i < this.word.length; i++) {
			this.letterList[this.word[i].toLowerCase()] = false;
		}

		this.wordBitmap = this.make.bitmapData(500, 100);
		this.wordBitmap.context.font = "48px Lucida Console";
		this.wordBitmap.context.fillStyle = "#696969";
		this.wordBitmap.context.fillText(this.word, 48, 48);
		this.wordBitmap.addToWorld();
		
        
		this.input.keyboard.addCallbacks(this, null, null, this.keyPress);
		
		var pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		pauseKey.onDown.add(this.pauseFunction, this);
		
    },

    update: function () {
		
    },
	
	pauseFunction: function () {
		this.game.paused ? this.game.paused = false : this.game.paused = true;
		console.log("The game is " + (this.game.paused ? "paused" : "unpaused") + "\n");
	},
	
	keyPress: function(char) {
		this.wordBitmap.cls();
		
		console.log(char + " has been pressed.\n");
		var x = 48;
		var winCheck = true;
		
		for (var i = 0; i < this.word.length; i++) {
			if (char == this.word.charAt(i).toLowerCase()) {
				this.letterList[this.word.charAt(i).toLowerCase()] = true;
			}
			
			if (this.letterList[this.word.charAt(i).toLowerCase()]) {
				this.wordBitmap.context.fillStyle = "#ffff00";
			} else {
				this.wordBitmap.context.fillStyle = "#696969";
				winCheck = false;
			}
			
			this.wordBitmap.context.fillText(this.word.charAt(i), x, 48);
			x += this.wordBitmap.context.measureText(this.word.charAt(i)).width;
		}
		
		if (winCheck == true) {
			this.endScreen();
		}
		
	},

    endScreen: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
		
		this.wordBitmap.destroy();
		
        this.state.start("EndScreen");

    }

};
