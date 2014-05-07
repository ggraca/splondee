function Drink(pos, img){
	this.pos = pos;
	this.sprite = new createjs.Bitmap("res/img/" + img + ".png");
	this.sprite.x = 100*pos;

	this.under = function(){
		return map.pipes[0][1 + pos * 2];
	}

	this.open = function(){
		this.under().receive({x: 1 + pos * 2, y: -1});
	}

	this.sprite.on("pressup", function(){
		map.flow();
	});
}