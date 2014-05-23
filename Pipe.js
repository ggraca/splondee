function Pipe(pos, t, rot){
	this.pos = pos;
	this.flows = pipes[t].flows(rot);
	this.locked = false;
	
	this.mixer = false;
	if(t == "mixer"){
		this.mixer = true;
		this.locked = true;
	}

	this.cross = false;
	if(t == "cross")
		this.cross = true;
	
	this.loadSprite(pipes[t].src(rot));
	this.setContainers();
	this.setInput();

		


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

					var nb;
					for(var j = 0; j < this.flows[i].exits.length; j++){
						nb = this.neighbour(this.flows[i].exits[j]);
						if(nb == null || !nb.receive(this.pos, this.flows[i].liq))
							map.flowing--;
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

				if(this.cross)
					map.flowing += 2;

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
}

Pipe.prototype.setInput = function(){
	this.container.on("mouseover", function(){
		if(map.selectedPipe != this)
			map.hoverSprite.visible = true;
			map.hoverSprite.x = this.container.x;
			map.hoverSprite.y = this.container.y;
	}, this);

	this.container.on("mouseout", function(){
		if(map.selectedPipe != this)
			map.hoverSprite.visible = false;
	}, this);

	this.container.on("click", function(){
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
	this.container = new createjs.Container();
	this.container.y = 50 * this.pos.y;
	this.container.x = 50 * this.pos.x;
	
	//add pipe sprite
	this.container.addChild(this.under);
	
	//add flows sprites
	for(var i = 0; i < this.flows.length; i++)
		this.container.addChild(this.flows[i].container);

	this.container.addChild(this.above);

	//set hitArea
	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, 50, 50);
	this.container.hitArea = hit;
}