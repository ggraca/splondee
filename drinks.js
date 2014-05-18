var drinks = {
	beer: {
		bottle: "beer"
	},
	soda: {
		bottle: "soda"
	},
	liquor: {
		bottle: "liquor"
	},
	tequila: {
		bottle: "tequila"
	},
	wine: {
		bottle: "wine"
	}
};

function Drink(pos, id){
	this.pos = pos;
	this.sprite = new createjs.Bitmap("res/img/bottles/" + drinks[id].bottle + ".png");
	this.sprite.x = 100*pos;

	this.under = function(){
		return map.pipes[0][1 + pos * 2];
	}

	this.open = function(){
		this.under().receive({x: 1 + pos * 2, y: -1}, ["beer"]);
	}

	this.sprite.on("pressup", function(){
		flow.start();
		map.flow();
	});
}