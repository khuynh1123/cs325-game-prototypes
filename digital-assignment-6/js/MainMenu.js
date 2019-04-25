"use strict";

GameStates.makeMainMenu = function( game, shared ) {
	
	var texts;
	var logo = null;


	var music = null;
	var statsButton = null;
	
	
	var newGameButton = null;
	var howtoButton = null;
	var closeButton = null;
	
	var infoBox;
	var infoText;
	
	var openTween;
	var closeTween;
	
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        // music.stop();

        //	And start the actual game
        game.state.start('Game');

    }
    
	
	function openInfo() {
		openTween = game.add.tween(infoBox.scale).to({x: 160, y: 200}, 1000, Phaser.Easing.Exponential.Out, true);
		openTween.onComplete.add(showInfo, this);
		infoBox.alpha = 1;
	}
	
	function showInfo() {
		
		infoText.alpha = 1;
		closeButton.alpha = 1;
		closeButton.inputEnabled = true;
		
		newGameButton.inputEnabled = false;
		howtoButton.inputEnabled = false;
	}
	
	function closeInfo(){
		if (openTween && openTween.isRunning || infoBox.scale == 0) {
			return;
		}

		closeTween = game.add.tween(infoBox.scale).to({x: 0, y: 0}, 500, Phaser.Easing.Exponential.In, true);
		infoBox.apha = 0;
		infoText.alpha = 0;
		closeButton.alpha = 0;
		closeButton.inputEnabled = false;
		newGameButton.inputEnabled = true;
		howtoButton.inputEnabled = true;
	}
	
    return {
    
		preload: function () {
			texts = game.cache.getJSON("textJSON");
		},
		
        create: function () {
    
            //music = game.add.audio('titleMusic');
            //music.play();
			logo = game.add.sprite(100, 0, "logo");
			logo.scale.setTo(0.25);
    		logo.anchor.set(0.25, 0.25);
			game.stage.backgroundColor = "#696969";
	
			
			newGameButton = game.add.button ( 50, 450, "newGameButton", startGame, null, "over", "out", "down");
			newGameButton.anchor.set(0);
			howtoButton = game.add.button( 750, 450, "howtoButton", openInfo, null, "over", "out", "down");
			howtoButton.anchor.set(1, 0);
			
			infoBox = game.add.sprite(0, 0, "infoBox");
			infoBox.alpha = 0;
			infoText = game.add.text(25, 50, texts.infoText, { font: "32px Arial", fill: "#000", align: "left" });
			infoText.anchor.set(0);
			infoText.alpha = 0;
			closeButton = game.add.button( 700, 50, "closeButton", closeInfo, null, "over", "out", "down");
			closeButton.alpha = 0;
			
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
