function Pipe(pos, t, rot){
	this.group = t;
	this.rot = rot;
	this.pos = pos;

	this.stage = new createjs.Container();
	this.sprite = pipeSprite(pipes[this.group].src(rot));
	this.stage.addChild(this.sprite);

	//for(var i = 0; i)	

	this.targets = [];
	this.mixer = 0;
	this.locked = false;
	this.liq = [];

	this.update = function(){
		this.updateFlow();
		this.updateAnimation();
	}

	this.updateFlow = function(){
		for(var i = 0; i < this.targets.length; i++){
			
			this.targets[i].state++;
			if(this.targets[i].state == 24){
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

	this.updateAnimation = function(){

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

	this.sprite.on("click", function(){
		if(!this.locked)
			map.input(this, null);
	}, this);

}

function pipeSprite(type){
	var data = {
		images: ["res/img/" + type + ".png"],
		frames: {width:50, height:50},
		animations: {run: [0], jump: [1]}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	return new createjs.Sprite(spriteSheet, "run");
}