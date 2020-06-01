/**
 * target object
 */

function Target(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.xPos = Math.round(Math.random() * this.canvas.width)+this.canvas.offsetLeft;
	this.yPos = Math.round(Math.random() * this.canvas.height)+this.canvas.offsetTop;
	this.xDirection = Math.round(Math.random()) > 0 ? 1 : -1;
	this.yDirection = Math.round(Math.random()) > 0 ? 1 : -1;
	this.xVelocity = Math.floor(Math.random()*Math.floor(3))+1;
	this.yVelocity = Math.floor(Math.random()*Math.floor(3))+1;
	this.xPosChange = this.xDirection*this.xVelocity;
	this.yPosChange = this.yDirection*this.yVelocity;
	this.hit = false;
	this.hitSound = new Audio("resources/breaking.mp3");
	this.value=this.xVelocity;
	this.explodeXPos5=5;
	this.explodeXPos10=10;
	this.explodeXPos0=0;
	this.explodeYPos5=5;
	this.explodeYPos10=10;
	this.explodeYPos0=0;
	this.colorLookup="0123456789ABCDEF";
	this.liveColor="#00FFFF";
	this.deadbeatColor=this.generateColor();
	
}

Target.prototype.draw = function() {
	if(!this.hit){
		// console.log("test- target");
		// console.log(this.xPos+","+this.yPos);
		this.context.save();
		this.context.beginPath();
		this.context.translate(this.xPos-this.canvas.offsetLeft, this.yPos+this.canvas.offsetTop);
		this.context.lineWidth=4;
		this.context.arc(0, 0, 20, 0, Math.PI * 2, true);
		this.context.moveTo(-5, 0);
		this.context.lineTo(0, 5);
		this.context.lineTo(10, 0);
		this.context.lineTo(0, -10);
		this.context.lineTo(-10, 0);
		this.context.lineTo(5, 0);
		this.context.strokeStyle =this.liveColor ;
		this.context.stroke();
		this.context.restore();
		this.xPos = this.xPos + this.xPosChange;
		this.yPos = this.yPos + this.yPosChange;
	}else{
		// console.log("test- target");
		// console.log(this.xPos+","+this.yPos);
		this.context.save();
		this.context.beginPath();
		this.context.translate(this.xPos-this.canvas.offsetLeft, this.yPos+this.canvas.offsetTop);
		this.context.lineWidth=3;
		this.context.arc(this.explodeXPos0, this.explodeYPos0, 10, 0, (Math.PI * 2)/4, false);
		this.context.moveTo(this.explodeXPos0*-2,  (this.explodeYPos0*-2)+10);
		this.context.arc(this.explodeXPos0*-2, this.explodeYPos0*-2, 10, (Math.PI * 2)/4, 2*(Math.PI * 2)/4, false);
		this.context.moveTo((this.explodeXPos0*-1)-10, (this.explodeYPos0));
		this.context.arc(this.explodeXPos0*-1, this.explodeYPos0, 10, 2*(Math.PI * 2)/4, 3*(Math.PI * 2)/4, false);

		
		
		this.context.moveTo(this.explodeXPos5*-2, this.explodeYPos0*2);
		this.context.lineTo(this.explodeXPos5*-2, this.explodeYPos0*2+5);
		
		this.context.moveTo(this.explodeXPos0, 5);
		this.context.lineTo(this.explodeXPos10, 0);		
		this.context.moveTo(this.explodeXPos10, 0);
		this.context.lineTo(this.explodeXPos0, 10*-1);
		
		this.context.moveTo(this.explodeXPos0*-2, this.explodeYPos0*1);
		this.context.lineTo(this.explodeXPos0*-2+10,  this.explodeYPos0*1);
		this.context.moveTo(this.explodeXPos10*-1, this.explodeYPos0*2);
		
		//this.context.moveTo(this.explodeXPos10*-1, 0);
		//this.context.lineTo(this.explodeXPos5, 0);
		
		this.context.strokeStyle =this.generateColor();//this.deadbeatColor;// "#00FFAA";
		
		this.context.stroke();
		this.context.restore();
		this.xPos = this.xPos + this.xPosChange;
		this.yPos = this.yPos + this.yPosChange;
		this.explodeXPos5=this.explodeXPos5 + this.xPosChange;
		this.explodeXPos10=this.explodeXPos10 + this.xPosChange;
		this.explodeXPos0=this.explodeXPos0 + this.xPosChange;
		this.explodeYPos5=this.explodeYPos5 + this.yPosChange;
		this.explodeYPos10=this.explodeYPos10 + this.yPosChange;
		this.explodeYPos0=this.explodeYPos0 + this.yPosChange;
		
	}

}

Target.prototype.generateColor = function(){
	returnColor="#";
	for (var i = 0; i < 6; i++) {
		returnColor=returnColor+this.colorLookup[Math.floor(Math.random()*Math.floor(17))];
	}
	console.log(returnColor);
	return returnColor;
}

Target.prototype.inHitBox = function(xpos, ypos) {
	if (xpos > this.xPos-20 && xpos < this.xPos + 20 && ypos > this.yPos-20
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
	if(this.xPos>this.canvas.offsetLeft&&this.yPos>this.canvas.offsetTop&&this.xPos<this.canvas.width+this.canvas.offsetLeft&&this.yPos<this.canvas.height+this.canvas.offsetTop){
		return true;
	}
	return false;
}












