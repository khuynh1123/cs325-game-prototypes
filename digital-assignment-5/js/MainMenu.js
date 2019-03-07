"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
	var statsButton = null;
    var clockCircle = null;
	var clockMinute = 0;
	var clockSecond = 0;
	var clockMinuteLine = null;
	var clockSecondLine = null;
	
	
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
	
	function drawClock() {
			clockCircle = game.add.graphics(0, 0);
			clockCircle.beginFill(0xdff6f5, 1);
			clockCircle.drawCircle(200, 500, 400);
			clockCircle.endFill();
			clockCircle.beginFill(0xffffff, 1);
			clockCircle.drawCircle(200, 500, 380);
			clockCircle.endFill();
			
			
			
			// Clock Minute Line
			clockMinute = 0;
			clockMinuteLine = game.add.graphics(0, 0);
			clockMinuteLine.beginFill(0x000000);
			clockMinuteLine.lineStyle(10, 0x000000, 0);
			clockMinuteLine.lineTo(200, 500);
			clockMinuteLine.moveTo(200 - (Math.sin(clockMinute) * 100), 500 - (Math.cos(clockMinute) * 100));
			clockMinuteLine.endFill();
			

			// Clock Second Line
			clockSecond = 0;
			clockSecondLine = game.add.graphics(0, 0);
			clockSecondLine.beginFill(0x000000);
			clockSecondLine.lineStyle(8, 0x000000, 0);
			clockSecondLine.lineTo(200, 500);
			clockSecondLine.moveTo(200 - (Math.sin(clockSecond) * 140), 500 - (Math.cos(clockSecond) * 140));
			clockSecondLine.endFill();
			
	}
	
	function updateClock() {
		
		clockSecond++;
		if (clockSecond > 59) {
			clockSecond = 0;
			clockMinute++;
			
			if (clockMinute > 59) {
				clockMinute = 0;
			}
		}
		clockMinuteLine.clear();
		clockMinuteLine.lineStyle(10, 0x000000, 1);
		clockMinuteLine.lineTo(200, 500);
		clockMinuteLine.moveTo(200 + (Math.sin(clockMinute / 10) * 100), 500 - (Math.cos(clockMinute / 10) * 100));
		
		clockSecondLine.clear();
		clockSecondLine.lineStyle(6, 0x000000, 1);
		clockSecondLine.lineTo(200, 500);
		clockSecondLine.moveTo(200 + (Math.sin(clockSecond / 10) * 140), 500 - (Math.cos(clockSecond / 10) * 140));
		
		
//console.log("Time is: " + clockMinute + " minutes and " + clockSecond + " seconds.");
		//console.log("Angles are: : Minute " + Math.sin(clockMinute * 6) + "  and Second " + Math.sin(clockSecond * 6) + ".");
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
    
        create: function () {
    
            //music = game.add.audio('titleMusic');
            //music.play();
    		
			game.stage.backgroundColor = "#696969";
	
			drawClock();
			game.time.events.loop(Phaser.Timer.SECOND, updateClock, this);
			
			newGameButton = game.add.button ( 525, 50, "newGameButton", startGame, null, "over", "out", "down");
			howtoButton = game.add.button( 525, 100, "howtoButton", openInfo, null, "over", "out", "down");
			
			infoBox = game.add.sprite(0, 0, "infoBox");
			infoBox.alpha = 0;
			infoText = game.add.text(25, 50, "\
			Stop the end of the world as we know it!\n\
			Collect materials to create the catalyst to\n\
			stop the portal from opening.  Obtain clues to\n\
			find the correct combination of three materials\n\
			before the countdown reaches zero!\
			", { font: "32px Arial", fill: "#000", align: "left" });
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
