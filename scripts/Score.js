/**
 * score object 
 */
function Score(canvas)  {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.score=0;
}

Score.prototype.draw = function (){
 	this.context.save();
	this.context.font = "bold 32pt Courier New";
	this.context.fillStyle = "#ffffff";
	this.context.fillText(this.getScore(), this.canvas.width/6,40);
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
