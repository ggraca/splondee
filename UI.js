function mainMenu(){

	var stageMainMenu = new createjs.Stage("myCanvas");

	createjs.Ticker.addEventListener("tick", stageMainMenu);

	stageMainMenu.enableMouseOver();

	/* SLIDER MENU - SLIDE TO PLAY */

	var _spriteSlider = new Image();
	_spriteSlider.src = "res/img/spriteSlider.png";

	var data = {
	    images: [_spriteSlider],
	    frames: { width: 50, height: 50, count: 3},
	    animations: { hover: [0], normal: [1], down: [2] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var slider = new createjs.Sprite(spriteSheet, "normal");
	var x_origin;
	var helper = new createjs.ButtonHelper(slider, "normal", "hover", "down");

	slider.x = 50;
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
		if(this.x-x_origin>400){
			alert("success!") // LOAD LEVEL
		}
		else{
			this.x = x_origin;
		}
	})

	/* LOGO ANIMATION */

	var _spriteLogo = new Image();
	_spriteLogo.src = "res/img/spriteLogo.png"
	var data2 = {
	    images: [_spriteLogo],
	    frames: { width: 600, height: 169, count: 4},
	    animations: { frame1: [0], frame2: [1], frame3: [2], frame4: [3] }
	};

	var spriteSheet2 = new createjs.SpriteSheet(data2);
	var logo = new createjs.Sprite(spriteSheet2, "frame1");

	logo.x = 90;
	logo.y = 50;

	stageMainMenu.addChild(logo);
	stageMainMenu.addChild(slider);
	stageMainMenu.update();
}

function levelMenu(){

}