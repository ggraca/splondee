var drinks = {
	beer: {
		bottle: "beer",
		anim: "beer",
		glass: {
			src: "beer",
			frames: 18
		},
		join: function(a){
			switch(a){
				case "beer":
					return "beer";
				case "tequila":
					return "desperados";
				default:
					return "nothing";
			}
		}
	},
	soda: {
		bottle: "soda",
		anim: "tequila_soda",
		glass: null,
		join: function(a){
			switch(a){
				case "soda":
					return "soda";
				case "wine":
					return "hybrid";
				case "liquor":
					return "liquor_soda";
				case "tequila":
					return "tequila_soda";
				default:
					return "nothing";
			}
		}
	},
	liquor: {
		bottle: "liquor",
		anim: "liquor",
		glass: null,
		join: function(a){
			switch(a){
				case "liquor":
					return "liquor";
				case "soda":
					return "liquor_soda";
				case "tequila":
					return "liquor_tequila";
				default:
					return "nothing";
			}
		}
	},
	tequila: {
		bottle: "tequila",
		anim: "tequila_soda",
		glass: {
			src: "shot",
			frames: 9
		},
		join: function(a){
			switch(a){
				case "tequila":
					return "tequila";
				case "beer":
					return "desperados";
				case "soda":
					return "tequila_soda";
				case "liquor":
					return "liquor_tequila";
				default:
					return "nothing";
			}
		}
	},
	wine: {
		bottle: "wine",
		anim: "wine",
		glass: {
			src: "wine",
			frames: 18
		},
		join: function(a){
			switch(a){
				case "wine":
					return "wine";
				case "soda":
					return "hybrid";
				default:
					return "nothing";
			}
		}
	},
	desperados: {
		bottle: null,
		anim: "beer",
		glass: {
			src: "desperados",
			frames: 26
		},
		join: function(a){
			switch(a){
				case "desperados":
					return "desperados";
				default:
					return "nothing";
			}
		}
	},
	hybrid: {
		bottle: null,
		anim: "hybrid",
		glass: {
			src: "hybrid",
			frames: 28
		},
		join: function(a){
			switch(a){
				case "hybrid":
					return "hybrid";
				default:
					return "nothing";
			}
		}
	},
	liquor_soda: {
		bottle: null,
		anim: "liquor_extra",
		glass: null,
		join: function(a){
			switch(a){
				case "liquor_soda":
					return "liquor_soda";
				case "tequila":
					return "splondee";
				default:
					return "nothing";
			}
		}
	},
	liquor_tequila: {
		bottle: null,
		anim: "liquor_extra",
		glass: null,
		join: function(a){
			switch(a){
				case "liquor_tequila":
					return "liquor_tequila";
				case "soda":
					return "splondee";
				default:
					return "nothing";
			}
		}
	},
	tequila_soda: {
		bottle: null,
		anim: "tequila_soda",
		glass: null,
		join: function(a){
			switch(a){
				case "tequila_soda":
					return "tequila_soda";
				case "liquor":
					return "splondee";
				default:
					return "nothing";
			}
		}
	},
	splondee: {
		bottle: null,
		anim: "liquor",
		glass: {
			src: "splondee",
			frames: 18
		},
		join: function(a){
			switch(a){
				case "splondee":
					return "splondee";
				default:
					return "nothing";
			}
		}
	},
	nothing: {
		bottle: null,
		anim: "wine",
		glass: null,
		join: function(a){
			return "nothing";
		}
	}
};

function Drink(pos, type){
	this.type = type;
	this.pos = pos;
	this.sprite = new createjs.Bitmap("res/img/bottles/" + drinks[type].bottle + ".png");
	this.sprite.x = 100*pos;

	this.under = function(){
		return map.pipes[0][1 + pos * 2];
	}

	this.open = function(){
		if(!this.under().receive({x: 1 + pos * 2, y: -1}, type)){
			map.flowing--;
			if(map.flowing == 0)
				gameover();
		}
	}

	this.sprite.on("pressup", function(){
		map.flow();
	});
}