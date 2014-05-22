var crap = {
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