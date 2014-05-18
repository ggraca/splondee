function Flow(){
	this.state = 0;
	this.reached = false;
	this.ready = false;
	this.sprite = flowSprite("teste");

	this.start = function(type){
		//add argument
		//choose flowA or flowB

		this.reached = true;
		this.sprite.gotoAndPlay("flowing");
	}

	this.update = function(){
		if(this.reached && !this.ready){
			this.state++;
			if(this.state == 24)
				this.ready = true;
		}
	}	
}

function flowSprite(type){
	var data = {
		images: ["res/img/" + type + ".png"],
		frames: {width:50, height:50},
		animations: {empty: 0, flowing: [0, 22, "full"], full: 23}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	return new createjs.Sprite(spriteSheet, "empty");
}