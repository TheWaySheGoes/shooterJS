/**
 * 
 *//**
 * Main game object with a principal logic.
 */

// constructor
function Menu(canvas) {
	// TODO
	// timer, score board, bullets
	//this.RUNNING=true;
	//this.fps=30;
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	//this.crosshair = crosshair;
	//this.maxTargets=5;
	//this.targets=[];
	//this.endTime=60; //game play time
	//this.timer = new Timer(this.fps,this.canvas,this.endTime);
	//this.score = score;//new Score(this.canvas);
	//this.interval=null;
	this.xPos =this.canvas.width/3;
	this.yPos = this.canvas.height/2;
	this.fontSize=(this.canvas.width*0.03)+(this.canvas.height*0.02)
	
}
// instance methods



Menu.prototype.inHitBox = function (xPos,yPos){
	if(xPos>this.canvas.offsetLeft+this.xPos&&xPos<this.canvas.offsetLeft+this.xPos+250&&yPos>this.canvas.offsetTop+this.yPos-32&&yPos<this.canvas.offsetTop+this.yPos){
		console.log("SELECT CLIcK");
		return true;
		
	}
	return false;
	
}

Menu.prototype.showButton = function () {
 	this.context.save();
	this.context.font = "bold 32pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText("START GAME",this.xPos ,this.yPos);
	this.context.restore();
	
}





Menu.prototype.clearFrame = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Menu.prototype.drawBackground = function() {
	this.context.beginPath();
	this.context.fillStyle = "#000000"; // color for rectangle
	// draw rectangle
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


}

Menu.prototype.drawMousePosition = function() {
	this.crosshair.draw();

}


Menu.prototype.draw=function() {
	// var imageData =
	// this.context.getImageData(0,0,canvas.width,canvas.height); //this goes
	// with putImageData()	
 	this.context.save();
 	this.context.beginPath();
	this.context.font = "bold "+this.fontSize+"pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText("START GAME",this.xPos ,this.yPos);
	this.context.restore();
	console.log(this.fontSize);

	
	//this.crosshair.getMagazine().draw();
	//this.clearTargets();
	//this.generateTargets();
	//this.drawTargets();
	//this.showScore();
	//this.showTimer();
	//this.isTimerFinished();
	// this.context.restore(); // this oges with contextSave() in setup()
	// this.context.putImageData(imageData, 0, 0); // this goes with imageData
	// this.clearFrame();

	
}






