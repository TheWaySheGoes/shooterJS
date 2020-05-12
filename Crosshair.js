/**
 * Crosshair object controlled by mouse
 */

function Crosshair(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.canvas.addEventListener("mousemove",this.getPos.bind(this),false);
	this.xPos;
	this.yPos;
	
}

Crosshair.prototype.getPos= function(element){
	//element.preventDefault();
	this.xPos = element.pageX;
	this.yPos = element.pageY;
	
}

Crosshair.prototype.draw = function() {	
	console.log("test- crosshair")
	console.log(this.xPos+","+this.yPos);
	//hide cursor when on canvas
	if(this.xPos>0 && this.xPos<this.canvas.width && this.yPos>0 && this.yPos<canvas.height){
		console.log("cursor in the box")
		this.canvas.style.cursor='none';
	}

	this.context.save();
	this.context.translate(this.xPos,this.yPos);
	this.context.moveTo(-3,0);
	this.context.lineTo(-10,0);
	this.context.moveTo(3,0);
	this.context.lineTo(10,0);
	this.context.moveTo(0,-3);
	this.context.lineTo(0,-10);
	this.context.moveTo(0,3);
	this.context.lineTo(0,10);	
	this.context.strokeStile = "#ffffff";
	this.context.stroke();
	this.context.restore();
	
}

Crosshair.prototype.clear = function() {
	
}

 /*
 	
	this.context.font = "bold 15pt Arial";
	this.context.fillStyle = "#ffffff";
	this.context.fillText("test", 0,25);
 */
