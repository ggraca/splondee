var flows = {
	rect: {
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return ["top", "down"];

				default:
					return ["right", "left"];
			}
		}
	},
	curve: {
		paths: function(rot){
			switch(rot){
				case 1:
					return ["right", "top"];
				case 2:
					return ["right", "down"];
				case 3:
					return ["left", "down"];
				default:
					return ["top", "left"];
			}
		}
	},
	cross: {
		paths: function(rot){
			return ["left", "right", "top", "down"];
		}
	},
	mixer: {
		paths: function(rot){
			switch(rot){
				case 1:
					return ["right", "mixer"];
				case 2:
					return ["mixer", "down"];
				default:
					return ["left", "mixer"];
			}
		}
	}
};

var pipes = {
	rect: {
		src: function(rot){
			switch(rot){
				case 1:
				case 3:
					return "rect1";

				default:
					return "rect0";
			}
		},
		flows: function(rot){
			return [new Flow("rect", rot)];
		}
	},
	curve: {
		src: function(rot){
			return "curve" + rot;
		},
		flows: function(rot){
			return [new Flow("curve", rot)];
		}
	},
	segundo: {
		src: function(rot){
			if(rot == 0 || rot == 2)
				return "segundo" + 0;
			return "segundo" + 1;
		},
		flows: function(rot){
			if(rot % 2 == 0)
				return [new Flow("curve", 0), new Flow("curve", 2)];
			return [new Flow("curve", 1), new Flow("curve", 3)];
		}
	},
	bridge: {
		src: function(rot){
			return "bridge";
		},
		flows: function(rot){
			return [new Flow("rect", 0), new Flow("rect", 1)];
		}
	},
	cross: {
		src: function(rot){
			return "cross";
		},
		flows: function(rot){
			return [new Flow("cross", 0)];
		}
	},
	mixer: {
		src: function(rot){
			return "mixer";
		},
		flows: function(rot){
			return [new Flow("mixer", 0), new Flow("mixer", 1), new Flow("mixer", 2)];
		}
	}
};

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