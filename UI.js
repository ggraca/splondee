function mainMenu(){
	createjs.Ticker.addEventListener("tick", stage);
	stage.enableMouseOver();

	/* BACKGROUND */
	var background = new createjs.Bitmap("res/img/backgrounds/mainMenu.png");

	/* LETTERING */

	var lettering = new createjs.Bitmap("res/img/slide-to-play.png");
	lettering.x = 200;
	lettering.y = 330;

	/* SLIDER MENU - SLIDE TO PLAY */

	var _spriteSlider = new Image();
	_spriteSlider.src = "res/img/spriteSlider.png";

	var data = {
	    images: [_spriteSlider],
	    frames: { width: 153, height: 209, count: 3},
	    animations: { normal: [0], hover: [1], down: [2] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var slider = new createjs.Sprite(spriteSheet, "normal");
	var x_origin;
	var helper = new createjs.ButtonHelper(slider, "normal", "hover", "down");

	slider.x = 70;
	slider.y = 300;

	slider.on("mousedown", function(evt){
		x_origin = this.x;
		this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
	});
	slider.on("pressmove", function(evt){
		this.x = evt.stageX + this.offset.x;
		update = true;
	});
	slider.on("pressup", function (evt) {
		if(this.x-x_origin>440){
			levelMenu();
		}
		else{
			this.x = x_origin;
		}
	})

	stage.addChild(background);
	stage.addChild(lettering);
	stage.addChild(slider);
	stage.update();
}

function levelMenu(){
	stage.removeAllChildren();
	createjs.Ticker.addEventListener("tick", stage);
	stage.enableMouseOver();

	/* BACKGROUND */
	var background = new createjs.Bitmap("res/img/backgrounds/levelMenu.png");
	stage.addChild(background);

	/* GENERATE BUTTONS FOR EVERY LEVEL */	
	var offsetX = 130;
	var offsetY = 50;

	var buttonLevelSprite = [];
	var buttonLevelHelper = [];
	var level = 0;

	for(var a=0;a<=2;a++){
		for(var b=0;b<=2;b++){
			var _spriteLevel = new Image();
			_spriteLevel.src = "res/img/levels/level" + (level+1) + ".png";

			var data = {
			    images: [_spriteLevel],
			    frames: { width: 150, height: 150, count: 3},
			    animations: { normal: [0], blocked: [1], hover: [2] }
			};

			var spriteSheet = new createjs.SpriteSheet(data);
			buttonLevelSprite[level] = new createjs.Sprite(spriteSheet, "normal");
			if(level==0) // LEVEL IS AVAILABLE
			{
				buttonLevelHelper[level] = new createjs.ButtonHelper(buttonLevelSprite[level], "normal", "hover");
			}
			else
			{
				buttonLevelHelper[level] = new createjs.ButtonHelper(buttonLevelSprite[level], "blocked");
				buttonLevelSprite[level].mouseEnabled = false;
			}

			buttonLevelSprite[level].x = b * 200 + offsetX;
			buttonLevelSprite[level].y = a * 150 + offsetY;

			stage.addChild(buttonLevelSprite[level]);
			level++;
		}
	}

	buttonLevelSprite[0].on("mousedown", function(evt){
		loadLevel();
	});

	stage.update();
}