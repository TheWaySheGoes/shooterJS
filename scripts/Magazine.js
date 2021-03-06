/**
 * 
 */
function Magazine(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.bullets = 15;
	this.magazineFullColor="#FFF9F2";
	this.magazineMediumColor="#F7B16A";
	this.magazineLowColor="#FA7D7D";
	this.magazineColor=this.magazineFullColor;
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
		this.magazineColor= this.magazineFullColor;
	}

}

Magazine.prototype.hardReload = function() {
		this.bullets = 15;
		this.magazineColor= this.magazineFullColor;

}

Magazine.prototype.shot = function() {
	if (!this.isEmpty()) {
		this.bullets--;
		this.setMagazineColor();
	}
}

Magazine.prototype.inReloadBox = function(xpos,ypos){
	if(xpos>10+this.canvas.offsetLeft&&xpos<75+this.canvas.offsetLeft&&ypos>this.canvas.height-35+this.canvas.offsetTop&&ypos<this.canvas.height-5+this.canvas.offsetTop){
		return true;
	}
	return false;
}

Magazine.prototype.setMagazineColor = function (){
	if(this.bullets>=10){
		this.magazineColor= this.magazineFullColor;
	}else if(this.bullets<10&&this.bullets>5){
		this.magazineColor= this.magazineMediumColor;
	}else{
		this.magazineColor= this.magazineLowColor;
	}
}

Magazine.prototype.draw = function() {

	this.context.save();
	this.context.beginPath();
	this.context.translate(0, 0);
	this.context.strokeStyle = this.magazineColor;
	//this.context.translate(this.canvas.width - 80, 20);
	this.context.lineWidth = 4;
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