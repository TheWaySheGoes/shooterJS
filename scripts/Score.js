/**
 * score object 
 */
function Score(canvas)  {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.score=0;
	this.xPos=this.canvas.width/8;
	this.yPos=40;
	this.highScore=0;

}

Score.prototype.draw = function (){
	this.context.save();
 	this.context.beginPath();
	this.context.font = "bold 15pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText("Score: "+this.getScore(),this.xPos ,this.yPos);
	this.context.font = "bold 12pt Courier New";
	this.context.fillText("HighScore: "+this.highScore,this.xPos ,this.yPos+20);
	this.context.restore();
}

Score.prototype.setHighScore = function (){
	if(	this.highScore<this.score){
		this.highScore=this.score;
		
	}
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
	this.xPos=this.canvas.width/8;
	this.yPos=40;
}
Score.prototype.setPosMenu = function (x,y){
	this.xPos=this.canvas.width/3;
	this.yPos=(this.canvas.height/2)+50;
}
