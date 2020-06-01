/**
 * Simple Timer object
 * 
 * 
 */

function Timer(fps, canvas, endTime) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.sec = 0;
	this.counter = 0;
	this.fps = fps;
	this.endTime = endTime;
	this.lastSecondsStart = this.endTime * 0.8;
	this.timerNormalColor = "#ffffff";
	this.timerLowTimeColor = "#FF5C5C";
	this.timerColor = this.timerNormalColor;
	this.fullTimeSound = new Audio("resources/Tick.mp3");
	this.lastSecondsTimeSound = new Audio("resources/Ticker.mp3");
	this.timerSound = this.fullTimeSound;
	this.timerSound.volume = 0.1;

}

Timer.prototype.moveTime = function() {
	this.counter++;
	if (this.counter % this.fps == 0.0) {
		this.sec++;
		this.setTimerColor();
		this.playSound();
	}
	if (this.isFinished()) {
		// this.resetTime();
	}
}

Timer.prototype.playSound = function() {
	if (this.sec < this.lastSecondsStart) {
		this.timerSound = this.fullTimeSound;
	} else {
		this.timerSound = this.lastSecondsTimeSound;
	}
	this.timerSound.pause();
	this.timerSound.currentTime = 0;
	this.timerSound.play();
}

Timer.prototype.stopSound = function() {
	this.timerSound.pause();
	this.timerSound.currentTime = 0;
}

Timer.prototype.getTime = function() {
	// console.log(this.sec);
	return this.sec;
}

Timer.prototype.isFinished = function() {
	if (this.sec >= this.endTime) {
		return true;
	}
	return false;
}

Timer.prototype.resetTime = function() {
	this.counter = 0;
	this.sec = 0;
	this.timerColor = this.timerNormalColor;
}

Timer.prototype.setTimerColor = function() {
	if (this.sec < this.lastSecondsStart) {
		this.timerColor = this.timerNormalColor;
	} else {
		this.timerColor = this.timerLowTimeColor;
	}
}

Timer.prototype.drawTime = function() {
	this.context.save();
	this.context.font = "bold 32pt Courier New";
	this.context.fillStyle = this.timerColor;
	this.context.fillText(this.getTime(), this.canvas.width / 6 * 4, 40);
	this.context.restore();
}
