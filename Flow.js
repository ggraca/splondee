function Flow(type, rot){
	this.type = type;
	this.rot = rot;

	this.state = 0;
	this.reached = false;
	this.ready = false;
	this.container = new createjs.Container();

	this.exits = flows[type].paths(rot);

	this.finalState = 15;
	if(this.type == "mixer"){
		if(rot == 2)
			this.finalState = 8;
		else
			this.finalState = 7;
	}

	this.start = function(from, liq){
		if(this.reached) return false;

		var i
		for(i = 0; i < this.exits.length; i++){
			if(this.exits[i] == from)
				break;
		}

		if(i == this.exits.length)
			return false;

		this.exits.splice(i, 1);


		if(i == 0)
			this.loadSprite(liq, "normal");
		else if(i == 1)
			this.loadSprite(liq, "reversed");
		else if(i == 2)
			this.loadSprite(liq, "cross2");
		else if(i == 3)
			this.loadSprite(liq, "cross3");

		this.liq = liq;
		this.reached = true;

		return true;
	}

	this.update = function(){
		if(this.reached && !this.ready){
			this.state++;
			if(this.state == this.finalState)
				this.ready = true;
		}
	}
}

Flow.prototype.loadSprite = function(liq, anim){
	var frames = 15;
	if(this.type == "mixer")
		frames = 7;

	var data = {
		images: ["res/img/pipeanimations/" + drinks[liq].anim + "/" + this.type + this.rot + ".png"],
		frames: {width:50, height:50},
		animations: {normal: [0, frames - 1, "full"], reversed: [frames, frames*2 - 1, "full"], cross2: [frames*2, frames*3-1, "full"], cross3: [frames*3, frames*4-1, "full"], full: frames-1}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	this.container.addChild(new createjs.Sprite(spriteSheet, anim));
}