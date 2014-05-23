function Receiver(pos, liq){
	this.liq = liq;
	this.pos = pos;
	this.accepted = false;

	this.loadSprite();
	this.setContainers();

	this.receive = function(pos, liq){
		if(liq == this.liq){
			this.accepted = true;
			this.sprite.gotoAndPlay("fill");
		}
		return false;
	}
}

Receiver.prototype.loadSprite = function(){
	//spritesheet
	var src = drinks[this.liq].glass.src;
	var frames = drinks[this.liq].glass.frames;

	var data = {
		images: ["res/img/receivers/" + src + ".png"],
		frames: {width:50, height:75},
		animations: {empty: [0], fill: [0, frames-1, "full"], full: [frames -1]}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	this.sprite = new createjs.Sprite(spriteSheet, "empty");
}

Receiver.prototype.setContainers = function(){
	this.container = new createjs.Container();
	this.container.x = 50*this.pos;

	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, 50, 100);
	this.container.hitArea = hit;

	this.hover = new createjs.Bitmap("res/img/receivers/" + this.liq + "hover.png");
	this.hover.visible = false;
	this.hover.y = -this.hover.getBounds().height + 25;

	this.container.addChild(this.sprite);
	this.container.addChild(this.hover);

	this.container.on("mouseover", function(){
		this.hover.visible = true;
	}, this);

	this.container.on("mouseout", function(){
		this.hover.visible = false;
	}, this);
}