function Pipe(x, y, width, height){
	GameObject.apply(this, [x, y, width, height]);

	this.type = ["", "2", "3", "4", "5", "6", "7"];
	this.rand = Math.floor((Math.random()*7));
	this.sprite = new Image();
	this.sprite.src = "res/img/PALHINHAS" + this.type[this.rand] + ".png";

	this.draw = function(){
		//canvas.fillStyle = this.colors[this.curColor];
		//canvas.fillRect(this.x, this.y, this.width, this.height);
		canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height);
	}
}

