/**
 * main entry point to the game. here HTML sends its canvas object to be manipulated
 */



function game(){
	var game = new Game(30);
	//game.setup();	
	//game.startGame();//argument = fps
	game.startMenu();
	
	//3 loops with setinterval splash, game,score

}
game();