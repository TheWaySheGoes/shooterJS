/**
 * score object 
 */
function Score(canvas)  {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.score=0;
	this.xPos=this.canvas.width/6;
	this.yPos=40;
}

Score.prototype.draw = function (){
 	this.context.save();
 	this.context.beginPath();
	this.context.font = "bold 32pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText(this.getScore(),this.xPos ,this.yPos);
	this.context.restore();
}

Score.prototype.minus = function (val) {
	this.score-=val;
}

Score.prototype.add = function (val) {
	this.score+=val;
}

Score.prototype.getScore = function () {
	return this.score;
}

Score.prototype.resetScore = function () {
	this.score=0;
}

Score.prototype.setPosGame = function (x,y){
	this.xPos=this.canvas.width/6;
	this.yPos=40;
}
Score.prototype.setPosMenu = function (x,y){
	this.xPos=this.canvas.width/2;
	this.yPos=(this.canvas.height/2)+50;
}