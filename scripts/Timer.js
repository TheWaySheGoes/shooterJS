/**
 * Simple Timer object
 * 
 * 
 */


function Timer(fps,canvas,endTime){
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.sec=0;
	this.counter=0;
	this.fps=fps;
	this.endTime=endTime;
}

Timer.prototype.moveTime = function (){
	this.counter++;
	if(this.counter%this.fps==0.0){
		this.sec++;
	}
	if(this.isFinished()){
		//this.resetTime();
	}
}

Timer.prototype.getTime = function (){
	console.log(this.sec);
	return this.sec;
}

Timer.prototype.isFinished = function (){
	if(this.sec>=this.endTime){
		return true;
	}
	return false;
}

Timer.prototype.resetTime = function (){
	this.counter=0;
	this.sec=0;
}

Timer.prototype.drawTime = function(){
 	this.context.save();
	this.context.font = "bold 32pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText(this.getTime(), this.canvas.width/6*4,40);
	this.context.restore();
}



