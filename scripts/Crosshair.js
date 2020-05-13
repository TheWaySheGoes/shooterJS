/**
 * Crosshair object controlled by mouse
 */

function Crosshair(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.xPos;
	this.yPos;
	this.canvas.addEventListener("mousemove", this.setPos.bind(this), false);
	this.crosshairColor = "#ffffff"
	this.emptySound = new Audio("resources/empty.mp3");
	this.fullSound = new Audio("resources/shot.mp3");
	this.shotSound = this.fullSound;
	this.reloadSound= new Audio("resources/reload.mp3");
	this.magazine = new Magazine(this.canvas);

}
/////////SHOOTING/////////////////////
Crosshair.prototype.reload = function() {
	if(this.magazine.isEmpty()){
		this.magazine.reload();
		this.shotSound=this.fullSound;
		this.reloadSound.play();
	}
	
}

Crosshair.prototype.shot = function() {
	if (!this.magazine.isEmpty()) {
		this.magazine.shot();
		
	}else{
		this.shotSound=this.emptySound;
	}
	this.shotSound.pause();
	this.shotSound.currentTime = 0;
	this.shotSound.play();

}

Crosshair.prototype.isEmpty = function(){
	if(this.magazine.isEmpty()){
		return true;
	}
	return false;
}

Crosshair.prototype.inReloadBox=function() {
	return this.magazine.inReloadBox(this.xPos,this.yPos);
}

////////////////MOUSE POS AND MOVEMENT///////////////////////
Crosshair.prototype.setPos = function(element) {
	// element.preventDefault();
	this.xPos = element.pageX;
	this.yPos = element.pageY;

}

Crosshair.prototype.draw = function() {

	// console.log("test- crosshair")
	console.log(this.xPos + "," + this.yPos);
	// hide cursor when on canvas
	if (this.xPos > 0 && this.xPos < this.canvas.width && this.yPos > 0
			&& this.yPos < canvas.height) {
		console.log("cursor in the box")
		this.canvas.style.cursor = 'none';
	}

	this.context.save();
	this.context.beginPath();
	this.context.translate(this.xPos - 8, this.yPos - 8);
	this.context.arc(0, 0, 10, 0, Math.PI * 2, true);
	this.context.moveTo(-3, 0);
	this.context.lineTo(-10, 0);
	this.context.moveTo(3, 0);
	this.context.lineTo(10, 0);
	this.context.moveTo(0, -3);
	this.context.lineTo(0, -10);
	this.context.moveTo(0, +3);
	this.context.lineTo(0, +10);
	this.context.strokeStile = this.crosshairColor;
	this.context.stroke();
	this.context.restore();

}

Crosshair.prototype.getMagazine = function(){
	return this.magazine;
}

Crosshair.prototype.clear = function() {

}
