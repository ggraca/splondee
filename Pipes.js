function Pipe(x, y, width, height){
	GameObject.apply(this, [x, y, width, height]);

	this.colors = ["#FF0000", "#00FF00", "#0000FF"];
	this.curColor = Math.floor((Math.random()*3));

	this.draw = function(){
		canvas.fillStyle = this.colors[this.curColor];
		canvas.fillRect(this.x, this.y, this.width, this.height);
	}
}