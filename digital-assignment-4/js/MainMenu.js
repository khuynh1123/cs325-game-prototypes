"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var background = null;
	var storyButton = null;
    var statsButton = null;
	
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		music.stop();
        //	And start the actual game
		shared.timesPlayed++;
        game.state.start('Story', shared);

    }
	
	function enterStats(pointer) {
		game.state.start("Stats", shared);
		
	}

    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
			
			if (!music || !music.isPlaying) {
				music = game.add.audio('nightMusic');
				music.loop = true;
				music.volume = 0.25;
				music.allowMultiple = false;		
			}
			
            background = game.add.sprite(0, 0, 'roomBackground');
    
            storyButton = game.add.button( 650, 100, 'storyButton', startGame, null, 'over', 'out', 'down');
			statsButton = game.add.button( 650, 160, "statsButton", enterStats, null, "over", "out", "down");
			
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
