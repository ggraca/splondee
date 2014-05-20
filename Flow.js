function Flow(type, rot){
	this.type = type;
	this.rot = rot;

	this.state = 0;
	this.reached = false;
	this.ready = false;
	this.container = new createjs.Container();

	this.paths = crap[type].paths(rot);

	this.start = function(from, liq){
		if(this.reached) return false;

		if(this.paths[0] == from){
			this.exit = this.paths[1];
			this.loadSprite(liq, "normal");
		}
		else if(this.paths[1] == from){
			this.exit = this.paths[0];
			this.loadSprite(liq, "reversed");
		}
		else
			return false;

		this.liq = liq;
		this.reached = true;
	}

	this.update = function(){
		if(this.reached && !this.ready){
			this.state++;
			if(this.state == 15)
				this.ready = true;
		}
	}
}

Flow.prototype.loadSprite = function(liq, anim){
	var data = {
		images: ["res/img/pipeanimations/" + drinks[liq].anim + "/" + this.type + this.rot + ".png"],
		frames: {width:50, height:50},
		animations: {normal: [0, 13, "full"], reversed: [15, 29, "full"], full: 14}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	this.container.addChild(new createjs.Sprite(spriteSheet, anim));
}