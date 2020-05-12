/**
 * Main game object with a principal logic.
 */

// constructor
function Game() {
	// TODO
	// timer, score board, bullets
	RUNNING=true;
	this.canvas = document.getElementById("canvas");
	this.context = canvas.getContext("2d");
	this.crosshair = new Crosshair(this.canvas);
}

// instance methods

Game.prototype.clearFrame = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.drawBackground = function() {
	this.context.fillStyle = "#dbdbdb"; // color for rectangle
	// draw rectangle
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


}

Game.prototype.drawMousePosition = function() {
	this.crosshair.draw();

}

Game.prototype.setup = function() {
	this.drawBackground();
	//this.context.save(); // this goes with this.context.restore(); in mainloop()
}

Game.prototype.mainLoop=function() {
	//var imageData = this.context.getImageData(0,0,canvas.width,canvas.height); //this goes with putImageData() 
	
	
	
	this.drawBackground();
	this.drawMousePosition();
	
	//this.context.restore(); // this oges with contextSave() in setup()
	//this.context.putImageData(imageData, 0, 0); // this goes with imageData
	//this.clearFrame();
}

Game.prototype.loop = function() {
	var gameFPS = 30;
	window.setInterval(this.mainLoop.bind(this), 1000 / gameFPS);// etInterval(()
																	// =>
																	// this.showLoading,
																	// 1000 /
																	// gameFPS);
}
