function Pipe(x, y){
	this.x = x;
	this.y = y;

	
	var c = Math.floor(Math.random()*3+1);

	if(c == 1)
		this.color = "#FF0000";
	else if(c == 2)
		this.color = "#00FF00";
	else if(c == 3)
		this.color = "#0000FF";

	this.draw = function(){
		canvas.fillStyle = this.color;
		canvas.fillRect(x, y, 100, 100);
	}
}