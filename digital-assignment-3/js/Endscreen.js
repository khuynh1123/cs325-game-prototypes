"use strict";

BasicGame.Endscreen = function (game) {

};

BasicGame.Endscreen.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');

	},

	update: function () {

	},

	shutdown: function() {

		//	Ok,a Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();
	}
	
	mainMenu: function(pointer) {
		this.state.start("MainMenu");
	},
	
	restartGame: function (pointer) {

		//	Restart the game
		this.state.start("Game");

	}

};
