/**
 * Main game object with a principal logic.
 */

// constructor
function Game(fps) {
	// TODO
	this.RUNNING=true;
	this.fps=fps;
	this.canvas = document.getElementById("canvas");
	this.canvas.width=window.innerWidth*0.8; 
	this.canvas.height=window.innerHeight*0.8; 
	this.context = this.canvas.getContext("2d");
	this.crosshair = new Crosshair(this.canvas);
	this.maxTargets=5;
	this.targets=[];
	this.canvas.addEventListener("mousedown",this.shot.bind(this));
	this.endTime=30; // game play time
	this.timer = new Timer(this.fps,this.canvas,this.endTime);
	this.score = new Score(this.canvas);
	this.interval=null;
	this.menu = new Menu(this.canvas);
	this.gameState="MENU";
	console.log("width: "+this.canvas.width+" height: "+this.canvas.height);
	
}
// instance methods
// //////////////////// SHOOTING/SELECTING - MOUSE EVENTS
// /////////////////////////////

// checks positions of crosshair and targets, marks targets true if hit
Game.prototype.shot = function(event){
	 event.stopPropagation(); event.preventDefault();
	console.log("!!!!!!")
	if(event.button==0){
		if(this.gameState=="GAME"){
		console.log("SCORE: "+this.score);
		this.crosshair.shot();
		for (var i = 0; i < this.targets.length; i++) {
			if(this.targets[i].inHitBox(this.crosshair.xPos,this.crosshair.yPos)&&!this.crosshair.isEmpty()){
				this.targets[i].targetHit();// mark as hit
				this.score.add(this.targets[i].value);// add to score
			}
		}
		if(this.crosshair.isEmpty()&&this.crosshair.inReloadBox()){
			this.crosshair.reload();
		}
		}else if(this.gameState=="MENU"){
			
			if(this.menu.inHitBox(this.crosshair.xPos,this.crosshair.yPos)){
				
				this.startGame();
				
			}
		}
	}
}




// //////////////////// TIMER /////////////////////////////
Game.prototype.showTimer = function(){
	this.timer.moveTime();
	this.timer.drawTime();

}

Game.prototype.isTimerFinished = function(){
	if(this.timer.isFinished()){
		this.startMenu();
		
	}
	else{
		return false;
	}
}

// //////////////////// STATE MANGEMENT /////////////////////////////

Game.prototype.stopGame = function(){
	console.log("clear interval");		
	window.clearInterval(this.interval);
	this.gameState="MENU";
	
}
Game.prototype.stopMenu = function(){
	console.log("clear interval");	
	window.clearInterval(this.interval);
	this.gameState="GAME";
}

Game.prototype.startGame = function(){
	this.stopMenu();
	this.setup();
	this.interval = window.setInterval(this.mainLoop.bind(this), 1000 / this.fps);
}

Game.prototype.startMenu = function(){
	this.stopGame();
	this.score.setPosMenu();	
	this.interval = window.setInterval(this.drawMenu.bind(this), 1000 / this.fps);// etInterval(()
	
}

Game.prototype.drawMenu = function(){
	this.drawBackground();
	this.menu.draw();
	this.score.draw();	
	this.drawMousePosition();
}



// //////////////////// SCORE /////////////////////////////

Game.prototype.showScore = function () {
	this.score.draw();
}

Game.prototype.generateTargets= function() {
	if(this.targets.length<this.maxTargets){
		this.targets.push(new Target(this.canvas))
	}
	console.log(this.targets);
}

// //////////////////// TARGETS /////////////////////////////

Game.prototype.drawTargets= function() {
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].draw();
	}
	
}

// remove hit targets
Game.prototype.clearTargets= function() {
	this.removeOutScreenTargets();
}

//not used after adding explosions to targets
//remove hit targets
Game.prototype.removeHitTargets=function() {
	for (var i = 0; i < this.targets.length; i++) {
		if(this.targets[i].isHit()==true) 
		{
			delete this.targets[i]
			this.targets.splice(i,1);// remove only //filter no mutate/not
										// used
			i--;// for glitch with shifted indexes
			
		}
	}
}
//remove targets outside screen
Game.prototype.removeOutScreenTargets = function() {
	for (var i = 0; i < this.targets.length; i++) {
		if(!this.targets[i].inBoundries()){
			delete this.targets[i]	
			this.targets.splice(i,1);// remove only //filter no mutate/not
									// used
			i--;// for glitch with shifted indexes
			this.score.minus(1);
		}
	}
}

// //////////////////// GAME STUFF /////////////////////////////

Game.prototype.clearFrame = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.drawBackground = function() {
	this.context.beginPath();
	this.context.fillStyle = "#000000"; // color for rectangle
	// draw rectangle
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


}

Game.prototype.drawMousePosition = function() {
	this.crosshair.draw();

}

Game.prototype.setup = function() {
	this.timer.resetTime();
	this.drawBackground();
	this.score.setPosGame();// show score on the top
	this.score.resetScore();
	this.crosshair.hardReload();
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

// //////////////////// /////////////////////////////




