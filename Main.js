/**
 * main entry point to the game. here HTML sends its canvas object to be manipulated
 */

function main(){
	var game = new Game();
	
	game.setup();	
	game.loop();
	
}

main();
