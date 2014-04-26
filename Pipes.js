function Pipe(x, y, width, height, i, j){
	GameObject.apply(this, [x, y, width, height]);

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
		this.sprite.src = "res/img/PALHINHAS4.png";
		this.marked = true;
	}

}

function PipeVertical(x, y, width, height, i, j){
	Pipe.apply(this, [x, y, width, height, i, j]);
	this.sprite.src = "res/img/PALHINHAS6.png";

	this.dest = function(){
		return [[0, -1], [0, 1]];
	}
}

function PipeHorizontal(x, y, width, height, i, j){
	Pipe.apply(this, [x, y, width, height, i, j]);
	this.sprite.src = "res/img/PALHINHAS7.png";	

	this.dest = function(){
		return [[-1, 0], [1, 0]];
	}
}

function PipeCurve(x, y, width, height, i, j){
	Pipe.apply(this, [x, y, width, height, i, j]);
	this.sprite.src = "res/img/PALHINHAS.png";

	this.dest = function(){
		return [[0, -1], [-1, 0]];
	}
}