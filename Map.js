function Map(levelIndex){
	this.pause = false;
	this.time = 25*60*3;
	this.pipes = [];
	this.drinks = [];
	this.cocktails = [];
	this.selectedPipe = null;
	this.open = false;
	this.delay = 24;

	if(level[levelIndex] != null)
		this.load(level[levelIndex]);
	else
		this.generate();
	this.setContainers();

	this.update = function(){
		if(!this.pause){
			this.time--;
			if(this.time <= 0)
				this.flow();

			for(var i = 0; i < this.pipes.length; i++){
				for(var j = 0; j < this.pipes[i].length; j++){
					this.pipes[i][j].update();
				}
			}
			if(this.selectedPipe != null && this.selectedPipe.locked)
				this.selectedPipe = null;

			if(this.open && this.flowing == 0){
				this.delay--;
				if(this.delay == 0){
					this.pause = true;
					for(var i = 0; i < this.cocktails.length; i++){
						if(this.cocktails[i] != null && !this.cocktails[i].accepted){
							gameover();
							return;
						}
					}
					success();
				}
			}	
		}
	}

	this.flow = function(){
		if(this.open) return;
		this.open = true;
		this.flowing = this.drinks.length;
		for(var i = 0; i < this.drinks.length; i++){
			this.drinks[i].open();
		}
	}

	this.swap = function(a, b){
		var pos = a.pos;
		a.pos = b.pos;
		b.pos = pos;

		this.pipes[a.pos.y][a.pos.x] = a;
		this.pipes[b.pos.y][b.pos.x] = b;


		var coord = {x: a.container.x, y: a.container.y};
		
		a.container.x = b.container.x;
		a.container.y = b.container.y;

		b.container.x = coord.x;
		b.container.y = coord.y;
	}

	this.input = function(pipe, dir){
		if(this.selectedPipe == null){
			this.selectedPipe = pipe;
			this.selectedSprite.visible = true;
			this.selectedSprite.x = pipe.container.x;
			this.selectedSprite.y = pipe.container.y;
		}
		else{
			//if(relation(pipe.pos, this.selectedPipe.pos) != "unknown"){
				this.swap(pipe, this.selectedPipe);
				this.selectedPipe.above.gotoAndPlay("normal");
				this.selectedPipe = null;
				this.selectedSprite.visible = false;
			//}
		}
	}
}

Map.prototype.generate = function(){

	for(var i = 0; i < 5; i++){
		var rand = Math.floor((Math.random() * 10));
		var s;
		if(rand == 0) s = "beer";
		else if(rand == 1) s = "wine";
		else if(rand == 2) s = "tequila";
		else if(rand == 3) s = "soda";
		else if(rand == 4) s = "liquor";
		else continue;

		var drink = new Drink(i, s);
		this.drinks.push(drink);
	}

	for(var i = 0; i < 5; i++){
		var line = [];
		for(var j = 0; j < 11; j++){
			
			var rand = Math.floor((Math.random() * 11));
			var rot = Math.floor((Math.random() * 4));
			var s;

			if(rand < 3) s = "rect";
			else if(rand < 6) s = "curve";
			else if(rand < 8) s = "segundo";
			else if(rand < 10) s = "cross";
			else s = "mixer";

			var pipe = new Pipe({x: j, y: i}, s, rot);
			line.push(pipe);
		}
		this.pipes.push(line);
	}

	for(var i = 0; i < 11; i++){
		if(i == 7){
			var cocktail = new Receiver(i, "beer");
			this.cocktails.push(cocktail);
		}
		else
			this.cocktails.push(null);
	}
}

Map.prototype.load = function(level){
		for(var i = 0; i < 5; i++){
			
			if(level.drinks[i] == null)
				continue;

			var drink = new Drink(i, level.drinks[i]);
			this.drinks.push(drink);
		}

		for(var i = 0; i < 5; i++){
			var line = [];
			for(var j = 0; j < 11; j++){

				var pipe = new Pipe({x: j, y: i}, level.pipes[i][j][0], level.pipes[i][j][1]);
				line.push(pipe);
			}
			this.pipes.push(line);
		}

		for(var i = 0; i < 11; i++){
			if(level.receiver[i] == null){
				this.cocktails.push(null);
				continue;
			}

			var cocktail = new Receiver(i, level.receiver[i]);
			this.cocktails.push(cocktail);
		}
}

Map.prototype.setContainers = function(){
	this.container = new createjs.Container();
	
	this.background = new createjs.Bitmap("res/img/backgrounds/gameplay.png");
	this.container.addChild(this.background);

	this.matrixStage = new createjs.Container();
	this.container.addChild(this.matrixStage);
	this.matrixStage.x = 125;
	this.matrixStage.y = 150;

	this.drinkStage = new createjs.Container();
	this.container.addChild(this.drinkStage);
	this.drinkStage.x = 150;
	this.drinkStage.y = 25;

	this.cocktailStage = new createjs.Container();
	this.container.addChild(this.cocktailStage);
	this.cocktailStage.x = 125;
	this.cocktailStage.y = 400;



	for(var i = 0; i < this.drinks.length; i++){
		if(this.drinks[i] != null)
			this.drinkStage.addChild(this.drinks[i].sprite);
	}

	for(var i = 0; i < this.pipes.length; i++){
		for(var j = 0; j < this.pipes[i].length; j++){
			if(this.pipes[i][j] != null)
				this.matrixStage.addChild(this.pipes[i][j].container);
		}
	}

	for(var i = 0; i < this.cocktails.length; i++){
		if(this.cocktails[i] != null)
			this.cocktailStage.addChild(this.cocktails[i].container);
	}

	this.selectedSprite = new createjs.Bitmap("res/img/selected.png");
	this.selectedSprite.visible = false;
	this.matrixStage.addChild(this.selectedSprite);

	this.hoverSprite = new createjs.Bitmap("res/img/hover.png");
	this.hoverSprite.visible = false;
	this.matrixStage.addChild(this.hoverSprite);
}