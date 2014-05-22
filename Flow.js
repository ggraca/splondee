function Flow(type, rot){
	this.type = type;
	this.rot = rot;

	this.state = 0;
	this.reached = false;
	this.ready = false;
	this.container = new createjs.Container();

	this.exits = flows[type].paths(rot);

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

		this.liq = liq;
		this.reached = true;

		return true;
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