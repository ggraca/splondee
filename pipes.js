var pipes = {
	rect: {
		src: function(rot){
			switch(rot){
				case 1:
				case 3:
					return "rect1";

				default:
					return "rect0";
			}
		},
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return {
						left: null,
					 	right: null,
					 	top: "down",
					 	down: "top"
					};

				default:
					return {
						left: "right",
					 	right: "left",
					 	top: null,
					 	down: null
					};
			}
		}
	},
	curve: {
		src: function(rot){
			return "curve" + rot;
		},
		paths: function(rot){
			switch(rot){
				case 1:
					return {
						left: null,
					 	right: "top",
					 	top: "right",
					 	down: null
					};

				case 2:
					return {
						left: null,
					 	right: "down",
					 	top: null,
					 	down: "right"
					};

				case 3:
					return {
						left: "down",
					 	right: null,
					 	top: null,
					 	down: "left"
					};

				default:
					return {
						left: "top",
					 	right: null,
					 	top: "left",
					 	down: null
					};
			}
		}
	},
	segundo: {
		src: function(rot){
			if(rot == 0 || rot == 2)
				return "segundo" + 0;
			return "segundo" + 1;
		},
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return {
						left: "down",
					 	right: "top",
					 	top: "right",
					 	down: "left"
					};

				default:
					return {
						left: "top",
					 	right: "down",
					 	top: "left",
					 	down: "right"
					};
			}
		}
	},
	bridge: {
		src: function(rot){
			return "bridge";
		},
		paths: function(rot){
			return {
				left: "right",
			 	right: "left",
			 	top: "down",
			 	down: "top"
			};
		}
	},
	mixer: {
		src: function(rot){
			return "home";
		},
		paths: function(rot){
			return {
				left: "mixer",
			 	right: "mixer",
			 	top: null,
			 	down: null
			};
		}
	}
}

function Pipe(pos, t, rot){
	this.group = t;
	this.rot = rot;
	this.pos = pos;

	//alterar isto
	this.sprite = getSprite(pipes[this.group].src(rot));

	this.targets = [];
	this.mixer = 0;
	this.locked = false;
	this.liq = [];

	this.update = function(){
		if(this.locked){
			for(var i = 0; i < this.targets.length; i++){
				
				this.targets[i].state++;
				if(this.targets[i].state == 20){
					if(this.targets[i].dir == "mixer"){
						this.mixer++;
						if(this.mixer == 2){
							this.targets.push({
								dir: "down",
								state: 0
							});
						}
					}
					else{
						this.sprite.gotoAndPlay("jump");

						var nb = this.neighbour(this.targets[i].dir);
						if(nb != null)
							nb.receive(this.pos, this.liq);
					}
				}
			}
		}
	}

	this.receive = function(other, liq){
		var origin = relation(this.pos, other);
		if(origin == "unknown")
			return null;

		if(pipes[this.group].paths(this.rot)[origin] != null){
			this.locked = true;
			this.targets.push({
				dir: pipes[this.group].paths(this.rot)[origin],
				state: 0
			});
			
			for(var i = 0; i < liq.length; i++)
				this.liq.push(liq[i]);
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
		if(!this.locked)
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