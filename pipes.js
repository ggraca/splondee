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
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return {
						left: null,
					 	right: null,
					 	top: "down",
					 	down: "top"
					};

				default:
					return {
						left: "right",
					 	right: "left",
					 	top: null,
					 	down: null
					};
			}
		}
	},
	curve: {
		src: function(rot){
			return "curve" + rot;
		},
		paths: function(rot){
			switch(rot){
				case 1:
					return {
						left: null,
					 	right: "top",
					 	top: "right",
					 	down: null
					};

				case 2:
					return {
						left: null,
					 	right: "down",
					 	top: null,
					 	down: "right"
					};

				case 3:
					return {
						left: "down",
					 	right: null,
					 	top: null,
					 	down: "left"
					};

				default:
					return {
						left: "top",
					 	right: null,
					 	top: "left",
					 	down: null
					};
			}
		}
	},
	segundo: {
		src: function(rot){
			if(rot == 0 || rot == 2)
				return "segundo" + 0;
			return "segundo" + 1;
		},
		paths: function(rot){
			switch(rot){
				case 1:
				case 3:
					return {
						left: "down",
					 	right: "top",
					 	top: "right",
					 	down: "left"
					};

				default:
					return {
						left: "top",
					 	right: "down",
					 	top: "left",
					 	down: "right"
					};
			}
		}
	},
	bridge: {
		src: function(rot){
			return "bridge";
		},
		paths: function(rot){
			return {
				left: "right",
			 	right: "left",
			 	top: "down",
			 	down: "top"
			};
		}
	},
	mixer: {
		src: function(rot){
			return "home";
		},
		paths: function(rot){
			return {
				left: "mixer",
			 	right: "mixer",
			 	top: null,
			 	down: null
			};
		}
	}
}