var level1 = {
	drinks: [null, null, "wine", null, "beer"],
	pipes: [
		[["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["curve", 1]],
		[["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["curve", 1]],
		[["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["curve", 1]],
		[["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["curve", 1]],
		[["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 1], ["rect", 1], ["curve", 0], ["curve", 1]]
	],
	receiver: [null, null, null, "a", null, null, null, null, null, null, null]
}

function Map(){
	//this.mapStage = new createjs.Container();
	this.pipes = [];
	this.matrixStage = new createjs.Container();

	this.drinks = [];
	this.drinkStage = new createjs.Container();

	this.cocktails = [];
	this.cocktailStage = new createjs.Container();

	this.selectedPipe = null;

	this.load = function(){
		for(var i = 0; i < 5; i++){
			
			if(level1.drinks[i] == null)
				continue;

			var drink = new Drink(i, level1.drinks[i]);
			this.drinkStage.addChild(drink.sprite);
			this.drinks.push(drink);
		}

		for(var i = 0; i < 5; i++){
			var line = [];
			for(var j = 0; j < 11; j++){

				var pipe = new Pipe({x: j, y: i}, level1.pipes[i][j][0], level1.pipes[i][j][1]);

				pipe.sprite.x = 50*j;
				pipe.sprite.y = 50*i;
				this.matrixStage.addChild(pipe.sprite);

				line.push(pipe);
			}
			this.pipes.push(line);
		}

		for(var i = 0; i < 11; i++){
			if(level1.receiver[i] == null)
				continue;

			var cocktail = new Receiver(i, "pipesaida", ["beer", "beer"]);
			this.cocktailStage.addChild(cocktail.sprite);
			this.cocktails.push(cocktail);
		}
	}

	this.generate = function(){
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
			this.drinkStage.addChild(drink.sprite);
			this.drinks.push(drink);
		}

		for(var i = 0; i < 5; i++){
			var line = [];
			for(var j = 0; j < 11; j++){
				
				var rand = Math.floor((Math.random() * 4));
				var rot = Math.floor((Math.random() * 4));
				var s;

				if(rand == 0) s = "rect";
				else if(rand == 1) s = "curve";
				else if(rand == 2) s = "segundo";
				else if(rand == 3) s = "mixer";

				var pipe = new Pipe({x: j, y: i}, s, rot);

				this.matrixStage.addChild(pipe.stage);
				pipe.stage.x = 50*j;
				pipe.stage.y = 50*i;

				line.push(pipe);
			}
			this.pipes.push(line);
		}

		for(var i = 0; i < 11; i++){
			var cocktail = new Receiver(i, "pipesaida", ["beer", "beer"]);
			this.cocktailStage.addChild(cocktail.sprite);
			this.cocktails.push(cocktail);
		}
	}

	this.update = function(){
		for(var i = 0; i < this.pipes.length; i++){
			for(var j = 0; j < this.pipes[i].length; j++){
				this.pipes[i][j].update();
			}
		}
		if(this.selectedPipe != null && this.selectedPipe.locked)
			this.selectedPipe = null;
	}

	this.flow = function(){
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


		var coord = {x: a.stage.x, y: a.stage.y};
		
		a.stage.x = b.stage.x;
		a.stage.y = b.stage.y;

		b.stage.x = coord.x;
		b.stage.y = coord.y;
	}

	this.input = function(pipe, dir){
		if(this.selectedPipe == null){
			this.selectedPipe = pipe;
		}
		else{
			this.swap(pipe, this.selectedPipe);
			this.selectedPipe = null;
		}
	}
}