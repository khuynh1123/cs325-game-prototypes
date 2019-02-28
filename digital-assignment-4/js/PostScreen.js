"use strict";

GameStates.makePost = function( game, shared ) {

	var menuButton = null;
	var text = null;
	
    function backToMainMenu(pointer) {
		if (shared.win == true) {
			shared.win = false;
			timesCompleted++;
		}
        game.state.start('MainMenu', shared);
    }
	
    return {
    
        create: function () {
			menuButton = this.add.button( 90, 35, 'menuButton', backToMainMenu, this, 'over', 'out', 'down');
				
			text = game.add.text(300, 300, "You collected all of the tuna!", {font: "36px Arial", fill: "#ffffff", align: "center"});
		},
		
        update: function () {
        }
        
    };
};
