function Map(x, y, width, height){
	GameObject.apply(this, [x, y, width, height]);

	this.MAX_Y = 7;
	this.MAX_X = 11;
	
	this.pos = [];
	this.selectedPipe = null;

	this.genRandom = function(){
		this.pos = new Array(this.MAX_Y);
		for(var i = 0; i < this.MAX_Y; i++){
			this.pos[i] = new Array(this.MAX_X);
			for(var j = 0; j < this.MAX_X; j++){
				this.pos[i][j] = new RectPipe(x + j*50, y + i*50, i, j);
			}
		}
		this.pos[3][3] = new CurvePipe(x + 3*50, y + 3*50, 3, 3);
	}

	this.genLevel = function(){
		this.pos = new Array(this.MAX_Y);
		for(var i = 0; i < this.MAX_Y; i++){
			this.pos[i] = new Array(this.MAX_X);
			for(var j = 0; j < this.MAX_X; j++){
				var n = level2[i][j];
				if(i == 0){
					if(n == 1)
						this.pos[i][j] = new Drink(x + j*50 - 25, y + i*50 - 75, j);
				}
				else{
					if(n == 0)
						this.pos[i][j] = new RectPipe(x + j*50, y + i*50, i, j);
					else if(n == 1)
						this.pos[i][j] = new CurvePipe(x + j*50, y + i*50, i, j);
					else if(n == 2)
						this.pos[i][j] = new RectPipe(x + j*50, y + i*50, i, j);
				}
			}
		}

		//this.pos[0][1] = new Drink(x + 1*50, y - 1, 3, 3);

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

					//this.flow(this.pos[i][j], null);

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

	this.flow = function(p, old){
		if(p.marked)
			return;

		var use = false
		var dest = [];

		var coords = p.dest();
		for(a of coords){
			var x = a[0] + p.j;
			var y = a[1] + p.i;

			if(x < 0 || x >= this.MAX_X || y < 0 || y >= this.MAX_Y)
				continue;

			if(this.pos[y][x] == old)
				use = true;
			else
				dest.push(this.pos[y][x]);
		}

		if(use || old == null){
			p.mark();
			for(a of dest)
				this.flow(a, p);
		}

	}



}