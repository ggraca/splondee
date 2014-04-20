function Pipe(x, y, width, height){
	GameObject.apply(this, [x, y, width, height]);
	this.sprite = new Image();
	this.sprite.src = "res/img/PALHINHAS6.png";	

	this.left = null;
	this.right = null;
	this.up = null;
	this.down = null;

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
}

function PipeVertical(x, y, width, height){
	Pipe.apply(this, [x, y, width, height]);
	this.sprite.src = "res/img/PALHINHAS6.png";	
}
function PipeHorizontal(x, y, width, height){
	Pipe.apply(this, [x, y, width, height]);
	this.sprite.src = "res/img/PALHINHAS7.png";	
}