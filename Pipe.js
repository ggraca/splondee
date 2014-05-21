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
	mixer: {
		src: function(rot){
			return "mixer";
		},
		flows: function(rot){
			return [new Flow("mixer", 0), new Flow("mixer", 1), new Flow("mixer", 2)];
		}
	}
};

function Pipe(pos, t, rot){
	this.pos = pos;

	this.flows = pipes[t].flows(rot);
	this.loadSprite(pipes[t].src(rot));
	this.setContainers();

	this.locked = false;
	this.mixer = false;

	if(t == "mixer"){
		this.mixer = true;
		//this.locked = true;
	}


	this.update = function(){
		if(this.mixer){
			this.flows[0].update();
			this.flows[1].update();

			if(this.flows[0].ready && this.flows[1].ready){
				this.flows[0].ready = false;
				this.flows[1].ready = false;

				this.above.gotoAndPlay("anim");
				this.flows[2].start("mixer", drinks[this.flows[0].liq].join(this.flows[1].liq)); //concat como deve ser
				this.mixer = false;
			}
		}
		else{
			for(var i = 0; i < this.flows.length; i++){
				this.flows[i].update();

				if(this.flows[i].ready){

					//decidir se se poe antes ou depois da verificação do null
					this.flows[i].ready = false;

					var nb = this.neighbour(this.flows[i].exit)
					if(nb == null || !nb.receive(this.pos, this.flows[i].liq)){
						map.flowing--;
						if(map.flowing == 0)
							gameover();
					}
				}
			}
		}
	}

	this.receive = function(other, liq){
		var origin = relation(this.pos, other);
		if(origin == "unknown")
			return false;

		for(var i = 0; i < this.flows.length; i++){
			if(this.flows[i].start(origin, liq)){
				this.locked = true;

				if(this.mixer && ((this.flows[0].reached && !this.flows[1].reached) || (!this.flows[0].reached && this.flows[1].reached)))
					return false
				return true;
			}
		}
		return false;
	}

	

	this.neighbour = function(side){
		var newPos = strToCoord(this.pos, side);

		if(newPos == null)
			return null;
		if(newPos.y == 5)
			return map.cocktails[newPos.x];
		if(newPos.y >= 0 && newPos.y < 5 && newPos.x >= 0 && newPos.x < 11)
			return map.pipes[newPos.y][newPos.x];

		return null;
	}

	this.stage.on("mouseover", function(){
		if(map.selectedPipe != this)
			this.above.gotoAndPlay("hover");
	}, this);

	this.stage.on("mouseout", function(){
		if(map.selectedPipe != this)
			this.above.gotoAndPlay("normal");
	}, this);

	this.stage.on("click", function(){
		if(!this.locked)
			map.input(this, null);
	}, this);
}

Pipe.prototype.loadSprite = function(type){
	var data = {
		images: ["res/img/pipes/" + type + ".png"],
		frames: {width:50, height:50},
		animations: {normal: [0], hover: [1], selected: [2], anim: [0, 0, "img"]}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	this.under = new createjs.Sprite(spriteSheet, "normal");
	this.above = new createjs.Sprite(spriteSheet, "normal");
}

Pipe.prototype.setContainers = function(){
	//create
	this.stage = new createjs.Container();
	this.stage.y = 50 * this.pos.y;
	this.stage.x = 50 * this.pos.x;

	//add pipe sprite
	this.stage.addChild(this.under);
	
	//add flows sprites
	for(var i = 0; i < this.flows.length; i++)
		this.stage.addChild(this.flows[i].container);

	this.stage.addChild(this.above);

	//set hitArea
	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, 50, 50);
	this.stage.hitArea = hit;

	
}