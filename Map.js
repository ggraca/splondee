function Map(){
	this.pos = [];
	this.genRandom = function(){
		this.pos = new Array(4);
		for(var i = 0; i < 4; i++){
			this.pos[i] = new Array(4);
			for(var j = 0; j < 4; j++){
				this.pos[i][j] = new Pipe(i*100, j*100, 100, 100);
			}
		}
	}

	this.draw = function(){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				this.pos[i][j].draw();
			}
		}
	}

}