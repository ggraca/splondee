function Receiver(pos, liq){
	this.liq = liq;
	this.pos = pos;

	this.loadSprite();

	this.receive = function(pos, liq){
		if(liq == this.liq){
			this.sprite.gotoAndPlay("fill");
			return true;
		}
		else{
			gameover();
			return false;
		}
	}
}

Receiver.prototype.loadSprite = function(){
	//spritesheet
	var src = drinks[this.liq].glass.src;
	var frames = drinks[this.liq].glass.frames;


	var data = {
		images: ["res/img/receivers/" + src + ".png"],
		frames: {width:50, height:100},
		animations: {empty: [0], fill: [0, frames-1, "full"], full: [frames -1]}
	};
	var spriteSheet = new createjs.SpriteSheet(data);


	//sprite
	this.sprite = new createjs.Sprite(spriteSheet, "empty");


	//pos
	this.sprite.x = 50*this.pos;
}