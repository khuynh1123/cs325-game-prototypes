"use strict";

GameStates.makeStats = function( game, shared ) {

	var backArrow = null;
	var totalTunaCollected = null;
	var timesStoryPlayed = null;
	var timesStoryCompleted = null;
	
	
    function backToMainMenu(pointer) {
        game.state.start('MainMenu', shared);

    }
	
    return {
    
        create: function () {
			backArrow = this.add.button( 40, 40, 'backArrow', backToMainMenu, this, 'over', 'out', 'down');
			
			totalTunaCollected = game.add.text(100, 100, "Total number of tuna collected: " + shared.totalTuna, {font: "32px Arial", fill: "#ffffff", align: "center"});
			
			timesStoryPlayed = game.add.text(100, 150, "Times story played: " + shared.timesPlayed, {font: "32px Arial", fill: "#ffffff", align: "center"});
		
			timesStoryCompleted = game.add.text(100, 200, "Times story completed: " + shared.timesCompleted, {font: "32px Arial", fill: "#ffffff", align: "center"});
    
		},
		
        update: function () {
        }
        
    };
};