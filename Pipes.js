function Pipe(x, y, i, j){
	GameObject.apply(this, [x, y, 50, 50]);

	this.i = i;
	this.j = j;
	this.marked = false

	this.sprite = new Image();

	this.dest = [];

	this.draw = function(){
		canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height);
	}

	this.copy = function(p){
		this.x = p.x;
		this.y = p.y;
		this.width = p.width;
		this.height = p.height;
	}

	this.swap = function(p){
		var temp = new Pipe(0, 0, 0, 0);
		temp.copy(p);
		p.copy(this);
		this.copy(temp);
	}

	this.flow = function(p){
		for(var i = 0; i < dest.size; i++){
			if(dest[i] != p){
				dest[i].flow(this);
			}
		}
	}

	this.mark = function(){
		this.sprite.src = "res/img/Cross.png";
		this.marked = true;
	}

}

function RectPipe(x, y, i, j){
	Pipe.apply(this, [x, y, i, j]);
	this.sprite.src = "res/img/Rect.png";

	this.dest = function(){
		return [[0, -1], [0, 1]];
	}
}

function CurvePipe(x, y, i, j){
	Pipe.apply(this, [x, y, i, j]);
	this.sprite.src = "res/img/Curve.png";

	this.dest = function(){
		return [[0, -1], [-1, 0]];
	}
}
