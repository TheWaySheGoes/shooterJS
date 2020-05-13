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
	this.maxTargets=10;
	this.targets=[];
	this.canvas.addEventListener("mousedown",this.shot.bind(this),false);

	
	this.score=0;
}
// instance methods

// checks positions of crosshair and targets, marks targets true if hit
Game.prototype.shot = function(event){
	if(event.button==0){
		console.log("SCORE: "+this.score);
		this.crosshair.shot();
		for (var i = 0; i < this.targets.length; i++) {
			if(this.targets[i].hitCheck(this.crosshair.xPos,this.crosshair.yPos)&&!this.crosshair.isEmpty()){
				this.targets[i].targetHit();// mark as hit
				this.score++;
			}
		}
		if(this.crosshair.isEmpty()&&this.crosshair.inReloadBox()){
			this.crosshair.reload();
		}
	}

}



Game.prototype.showScore = function () {

 	
	this.context.font = "bold 15pt Arial";
	this.context.fillStyle = "#ffffff";
	this.context.fillText(this.score, 0,25);
 
}

Game.prototype.generateTargets= function() {
	if(this.targets.length<this.maxTargets){
		this.targets.push(new Target(this.canvas))
	}
	console.log(this.targets);
}

Game.prototype.drawTargets= function() {
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].draw();
	}
	
}

Game.prototype.clearTargets= function() {
	for (var i = 0; i < this.targets.length; i++) {
		if(this.targets[i].isHit()==true)
		{
			this.targets.splice(i,1);// remove only //filter no mutate/not
										// used
			i--;// for glitch with shifted indexes
		}
		if(this.targets[i].xPos<0||this.targets[i].yPos<0||this.targets[i].xPos>this.canvas.width||this.targets[i].yPos>this.canvas.height){
			this.targets.splice(i,1);// remove only //filter no mutate/not
										// used
			i--;// for glitch with shifted indexes
		}
	}
}

Game.prototype.clearFrame = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.drawBackground = function() {
	this.context.beginPath();
	this.context.fillStyle = "#dbdbdb"; // color for rectangle
	// draw rectangle
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


}

Game.prototype.drawMousePosition = function() {
	this.crosshair.draw();

}

Game.prototype.setup = function() {
	this.drawBackground();
	// this.context.save(); // this goes with this.context.restore(); in
	// mainloop()
}

Game.prototype.mainLoop=function() {
	// var imageData =
	// this.context.getImageData(0,0,canvas.width,canvas.height); //this goes
	// with putImageData()
	
	this.drawBackground();
	this.crosshair.getMagazine().draw();
	this.clearTargets();
	this.generateTargets();
	this.drawTargets();
	this.showScore();
	// this.context.restore(); // this oges with contextSave() in setup()
	// this.context.putImageData(imageData, 0, 0); // this goes with imageData
	// this.clearFrame();
	this.drawMousePosition();
}

// main entry to the game from Main.js
Game.prototype.loop = function(fps) {
	var gameFPS = fps;
	window.setInterval(this.mainLoop.bind(this), 1000 / gameFPS);// etInterval(()
																	// // => //
																	// this.showLoading
																	// // 1000
																	// //
																	// gameFPS);
}