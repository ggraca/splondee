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
				this.pos[i][j] = new PipeVertical(x + j*50, y + i*50, 50, 50, i, j);
			}
		}
		this.pos[0][0] = new PipeHorizontal(x + 0, y + 0, 50, 50, 0, 0);
		this.pos[3][3] = new PipeCurve(x + 3*50, y + 3*50, 50, 50, 3, 3);
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

					this.flow(this.pos[i][j], null);

					// if(this.selectedPipe == null)
					// 	this.selectedPipe = this.pos[i][j];
					// else{
					// 	if(this.selectedPipe != this.pos[i][j])
					// 		this.pos[i][j].swap(this.selectedPipe);
					// 	this.selectedPipe = null;
					// }
					return;
				}
			}
		}
	}

	this.flow = function(p, old){
		if(p.marked)
			return;

		p.mark();
		var l = p.dest();

		for(var a = 0; a < l.length; a++){
			var x = l[a][0] + p.j;
			var y = l[a][1] + p.i;


			if(x < 0 || x >= this.MAX_X || y < 0 || y >= this.MAX_Y)
				continue;

			this.flow(this.pos[y][x], p);
		}
	}
}