function Map(x, y, width, height){
	GameObject.apply(this, [x, y, width, height]);

	this.MAX_Y = 5;
	this.MAX_X = 10;
	
	this.pos = [];
	this.selectedPipe = null;

	this.genRandom = function(){
		this.pos = new Array(this.MAX_Y);
		for(var i = 0; i < this.MAX_Y; i++){
			this.pos[i] = new Array(this.MAX_X);
			for(var j = 0; j < this.MAX_X; j++){
				this.pos[i][j] = new StraightVertical(x + j*50, y + i*50, 50, 50);
			}
		}
		this.pos[0][0] = new StraightHorizontal(x + 0, y + 0, 50, 50);
	}

	this.draw = function(){
		for(var i = 0; i < this.MAX_Y; i++){
			for(var j = 0; j < this.MAX_X; j++){
				this.pos[i][j].draw();
			}
		}
	}

	this.input = function(mouse){
		for(var i = 0; i < this.MAX_Y; i++){
			for(var j = 0; j < this.MAX_X; j++){
				if(this.pos[i][j].handleClick(mouse)){
					if(this.selectedPipe == null)
						this.selectedPipe = this.pos[i][j];
					else{
						if(this.selectedPipe != this.pos[i][j])
							this.pos[i][j].swap(this.selectedPipe);
						this.selectedPipe = null;
					}
					return;
				}
			}
		}
	}
}