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
    

    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            //music = game.add.audio('titleMusic');
            //music.play();
    
            //game.add.sprite(0, 0, 'titlePage');
    
            //playButton = game.add.button( 303, 400, 'playButton', startGame, null, 'over', 'out', 'down');
			
			
			game.stage.backgroundColor = "#696969";
	
			drawClock();
			game.time.events.loop(Phaser.Timer.SECOND, updateClock, this);
			
			newGameButton = game.add.button ( 525, 50, "newGameButton", startGame, null, "over", "out", "down");
	
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
