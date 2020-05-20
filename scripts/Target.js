/**
 * target object
 */

function Target(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.xPos = Math.round(Math.random() * this.canvas.width);
	this.yPos = Math.round(Math.random() * this.canvas.height);
	this.xDirection = Math.round(Math.random()) > 0 ? 1 : -1;
	this.yDirection = Math.round(Math.random()) > 0 ? 1 : -1;
	this.xVelocity = Math.round(Math.random()*1)+1;
	this.yVelocity = Math.round(Math.random()*1)+1;
	this.xPosChange = 1 * this.xDirection*this.xVelocity;
	this.yPosChange = 1 * this.yDirection*this.yVelocity;
	this.hit = false;
	this.hitSound = new Audio("resources/breaking.mp3");
	this.value=this.xVelocity;
}

Target.prototype.draw = function() {
	// console.log("test- target");
	// console.log(this.xPos+","+this.yPos);
	this.context.save();
	this.context.beginPath();
	this.context.arc(this.xPos, this.yPos, 10, 0, Math.PI * 2, true);
	this.context.translate(this.xPos, this.yPos);
	this.context.moveTo(-5, 0);
	this.context.lineTo(0, 5);
	this.context.lineTo(10, 0);
	this.context.lineTo(0, -10);
	this.context.lineTo(-10, 0);
	this.context.lineTo(5, 0);
	this.context.strokeStyle = "#00FFFF";
	this.context.stroke();
	this.context.restore();
	this.xPos = this.xPos + this.xPosChange;
	this.yPos = this.yPos + this.yPosChange;

}

Target.prototype.inHitBox = function(xpos, ypos) {
	if (xpos > this.xPos && xpos < this.xPos + 20 && ypos > this.yPos
			&& ypos < this.yPos + 20) {
		return true;
	}
	return false;
}

Target.prototype.targetHit = function() {
	this.hit = true;
	//this.hitSound.pause();
	//this.hitSound.currentTime=0;
	this.hitSound.play();
}

Target.prototype.isHit = function() {
	return this.hit;
}


Target.prototype.inBoundries = function(){
	if(this.xPos>0&&this.yPos>0&&this.xPos<this.canvas.width&&this.yPos<this.canvas.height){
		return true;
	}
	return false;
}












