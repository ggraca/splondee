var crap = {
	rect: {
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return ["down", "top"];

				default:
					return ["right", "left"];
			}
		}
	},
	curve: {
		paths: function(rot){
			switch(rot){
				case 1:
					return ["top", "right"];
				case 2:
					return ["down", "right"];
				case 3:
					return ["down", "left"];
				default:
					return ["top", "left"];
			}
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