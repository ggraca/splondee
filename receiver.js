function Receiver(pos, liq){
	this.liq = liq;
	this.pos = pos;

	this.loadSprite();

	this.receive = function(pos, liq){
		if(liq == this.liq){
			this.sprite.gotoAndPlay("filling");
			alert("GG");
		}
		else{
			alert("BG");
		}
	}
}

Receiver.prototype.loadSprite = function(){
	//spritesheet
	var data = {
		images: ["res/img/receivers/" + drinks[this.liq].glass + ".png"],
		frames: {width:50, height:75},
		animations: {empty: [0], filling: [1, 13, "full"], full: [14]}
	};
	var spriteSheet = new createjs.SpriteSheet(data);


	//sprite
	this.sprite = new createjs.Sprite(spriteSheet, "empty");


	//pos
	this.sprite.x = 50*this.pos;
}