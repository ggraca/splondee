var pipes = {
	rect: {
		src: "Rect",
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return {
						left: [],
					 	right: [],
					 	top: ["down"],
					 	down: ["top"]
					};

				default:
					return {
						left: ["right"],
					 	right: ["left"],
					 	top: [],
					 	down: []
					};
			}
		}
	},
	curve: {
		src: "Curve",
		paths: function(rot){
			switch(rot){
				case 1:
					return {
						left: [],
					 	right: ["top"],
					 	top: ["right"],
					 	down: []
					};

				case 2:
					return {
						left: [],
					 	right: ["down"],
					 	top: [],
					 	down: ["right"]
					};

				case 3:
					return {
						left: ["down"],
					 	right: [],
					 	top: [],
					 	down: ["left"]
					};

				default:
					return {
						left: ["top"],
					 	right: [],
					 	top: ["left"],
					 	down: []
					};
			}
		}
	}
}

function Pipe(pos, t, rot){
	this.group = t;
	this.rot = rot;
	this.pos = pos;
	this.sprite = getSprite(t + rot);

	this.targets = [];

	this.loading = 0;
	this.reached = false;

	this.update = function(){
		if(this.reached){
			this.loading++;
			if(this.loading == 20){
				
				this.sprite.gotoAndPlay("jump");

				var nb;
				for(var i = 0; i < this.targets.length; i++){
					
					nb = this.neighbour(this.targets[i]);
					if(nb != null){
						nb.receive(this.pos);
					}
				}
			}
		}
	}

	this.receive = function(other){
		var origin = relation(this.pos, other);
		
		if(origin == "unknown")
			return null;

		for(var i = 0; i < pipes[this.group].paths(this.rot)[origin].length; i++){
			this.reached = true;
			this.targets.push(pipes[this.group].paths(this.rot)[origin][i]);
		}
	}

	this.neighbour = function(side){
		var newPos = strToCoord(this.pos, side);

		if(newPos == null)
			return null;
		if(newPos.y == 5)
			return map.cocktails[newPos.x];
		if(newPos.y >= 0 && newPos.y < 5 && newPos.x >= 0 && newPos.x < 11)
			return map.pipes[newPos.y][newPos.x];

		return null;
	}

	this.sprite.on("pressup", function(){
		map.input(this, null);
	}, this);

}

function getSprite(type){
	var data = {
		images: ["res/img/" + type + ".png"],
		frames: {width:50, height:50},
		animations: {run: [0], jump: [1]}
	};

	var spriteSheet = new createjs.SpriteSheet(data);

	return new createjs.Sprite(spriteSheet, "run");
}