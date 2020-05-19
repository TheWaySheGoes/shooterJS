/**
 * Main game object with a principal logic.
 */

// constructor
function Game() {
	// TODO
	// timer, score board, bullets
	this.RUNNING=true;
	this.fps=30;
	this.canvas = document.getElementById("canvas");
	this.context = canvas.getContext("2d");
	this.crosshair = new Crosshair(this.canvas);
	this.maxTargets=5;
	this.targets=[];
	this.canvas.addEventListener("mousedown",this.shot.bind(this),false);
	this.endTime=5; //game play time
	this.timer = new Timer(this.fps,this.canvas,this.endTime);
	this.score=0;
	this.interval=null;
}
// instance methods

// checks positions of crosshair and targets, marks targets true if hit
Game.prototype.shot = function(event){
	if(event.button==0){
		console.log("SCORE: "+this.score);
		this.crosshair.shot();
		for (var i = 0; i < this.targets.length; i++) {
			if(this.targets[i].inHitBox(this.crosshair.xPos,this.crosshair.yPos)&&!this.crosshair.isEmpty()){
				this.targets[i].targetHit();// mark as hit
				this.score+=this.targets[i].value;//add to score
			}
		}
		if(this.crosshair.isEmpty()&&this.crosshair.inReloadBox()){
			this.crosshair.reload();
		}
	}

}

Game.prototype.showTimer = function(){
	this.timer.moveTime();
	this.timer.drawTime();
}

Game.prototype.isTimerFinished = function(){
	if(this.timer.isFinished()){
		window.clearInterval(this.interval);
		console.log("clear interval");
	}
	else{
		return false;
	}
}

Game.prototype.showScore = function () {
 	this.context.save();
	this.context.font = "bold 32pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText(this.score, this.canvas.width/6,40);
	this.context.restore();
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
			delete this.targets[i]
			this.targets.splice(i,1);// remove only //filter no mutate/not
										// used
			i--;// for glitch with shifted indexes
			
		}
	}
	for (var i = 0; i < this.targets.length; i++) {
		if(!this.targets[i].inBoundries()){
			delete this.targets[i]	
			this.targets.splice(i,1);// remove only //filter no mutate/not
									// used
			i--;// for glitch with shifted indexes
			this.score--;
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
	this.showTimer();
	this.isTimerFinished();
	// this.context.restore(); // this oges with contextSave() in setup()
	// this.context.putImageData(imageData, 0, 0); // this goes with imageData
	// this.clearFrame();
	this.drawMousePosition();
	
}

// main entry to the game from Main.js
Game.prototype.loop = function(fps) {
	var gameFPS = fps;
	this.fps=fps
	this.interval = window.setInterval(this.mainLoop.bind(this), 1000 / gameFPS);// etInterval(()
																	// // => //
																	// this.showLoading
																	// // 1000
																	// //
																	// gameFPS);
}