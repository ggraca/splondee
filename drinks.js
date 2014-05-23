function Drink(pos, type){
	this.type = type;
	this.pos = pos;
	this.sprite = new createjs.Bitmap("res/img/bottles/" + drinks[type].bottle + ".png");
	this.sprite.x = 100*pos;

	this.under = function(){
		return map.pipes[0][1 + pos * 2];
	}

	this.open = function(){
		if(!this.under().receive({x: 1 + pos * 2, y: -1}, type))
			map.flowing--;
	}
}