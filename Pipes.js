function Pipe(x, y, width, height){
	this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

	this.colors = ["#FF0000", "#00FF00", "#0000FF"]
	this.curColor = 0;

	this.draw = function(){
		canvas.fillStyle = this.colors[this.curColor];
		canvas.fillRect(this.x, this.y, this.width, this.height);
	}
}

Pipe.prototype = new gameObject;
