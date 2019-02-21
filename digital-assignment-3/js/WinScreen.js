"use strict";

BasicGame.WinScreen = function (game) {
	this.playButton = null;
};

BasicGame.WinScreen.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		
		this.game.add.text(200, 200, "You win! Try again?", {font: "32px Arial", fill: "#ffffff", align: "center"});
		
		this.playButton = this.add.button( 303, 400, 'playButton', this.restartGame, this, 'over', 'out', 'down');

	},

	update: function () {

	},
	
	backToMainMenu: function(pointer) {
		this.state.start("MainMenu");
	},
	
	restartGame: function (pointer) {

		//	Restart the game
		this.state.start("Game");

	}

};
