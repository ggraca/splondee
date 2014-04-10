function Map(){
	this.MAX_Y = 5;
	this.MAX_X = 10;
	
	this.pos = [];
	this.genRandom = function(){
		this.pos = new Array(this.MAX_Y);
		for(var i = 0; i < this.MAX_Y; i++){
			this.pos[i] = new Array(this.MAX_X);
			for(var j = 0; j < this.MAX_X; j++){
				this.pos[i][j] = new Pipe(j*50, i*50, 50, 50);
			}
		}
	}

	this.draw = function(){
		for(var i = 0; i < this.MAX_Y; i++){
			for(var j = 0; j < this.MAX_X; j++){
				this.pos[i][j].draw();
			}
		}
	}
}