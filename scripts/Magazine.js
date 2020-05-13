/**
 * 
 */
function Magazine(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.bullets = 15;

}

Magazine.prototype.isEmpty = function() {
	if (this.bullets <= 0) {
		return true;
	}
	return false;
}

Magazine.prototype.reload = function() {
	if (this.isEmpty()) {
		this.bullets = 15;
	}

}

Magazine.prototype.shot = function() {
	if (!this.isEmpty()) {
		this.bullets--;

	}
}

Magazine.prototype.inReloadBox = function(xpos,ypos){
	if(xpos>10&&xpos<75&&ypos>this.canvas.height-35&&ypos<this.canvas.height-5){
		return true;
	}
	return false;
}

Magazine.prototype.draw = function() {

	this.context.save();
	this.context.beginPath();
	this.context.strokeStile = "#ff8f3f";
	//this.context.translate(this.canvas.width - 80, 20);
	this.context.lineWidth = 2;
	var xShift=0;
	for (var i = 0; i < this.bullets; i++) {
		this.context.moveTo(20+xShift, this.canvas.height-30);
		this.context.lineTo(25+xShift, this.canvas.height-10);
		xShift+=3;
	}
	this.context.moveTo(10,this.canvas.height-35)
	this.context.lineTo(16,this.canvas.height-5);
	this.context.lineTo(75,this.canvas.height-5);
	this.context.lineTo(68,this.canvas.height-35);
	this.context.lineTo(10,this.canvas.height-35);
	
	
	
	this.context.stroke();
	this.context.restore();
}