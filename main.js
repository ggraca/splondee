var stage, map, editor;
init();

function init(){
	stage = new createjs.Stage("myCanvas");
	stage.enableMouseOver();
	createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(24);

	var srcMusic = "res/sound/music.mp3";
	createjs.Sound.registerSound(srcMusic);

	createjs.Sound.play(srcMusic, "none", 0, 0, -1, 0.5, 0);
 	mainMenu();
	loadMenu();
	//loadLevel(0);
}

function update(){
	if(map != null)
		map.update();
	stage.update();
}

function loadLevel(level){
	stage.removeAllChildren();

	map = new Map(level);
	stage.addChild(map.container);
	stage.level = level;

	loadMenu();
}

function gameover(){
	var dialog = new createjs.Bitmap("res/img/backgrounds/gameover.png");

	var _spriteButton = new Image();
	_spriteButton.src = "res/img/buttons/restart.png";

	var data = {
	    images: [_spriteButton],
	    frames: { width: 60, height: 60, count: 2},
	    animations: { normal: [0], hover: [1] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var buttonContinue = new createjs.Sprite(spriteSheet, "normal");
	var helper = new createjs.ButtonHelper(buttonContinue, "normal", "hover");
	buttonContinue.x = 680;
	buttonContinue.y = 475;

	stage.addChild(dialog);
	stage.addChild(buttonContinue);

	buttonContinue.on("mousedown", function(evt){
		loadLevel(stage.level);
	});
}

function success(){
	var dialog = new createjs.Bitmap("res/img/backgrounds/success.png");

	var _spriteButton = new Image();
	_spriteButton.src = "res/img/buttons/continue.png";

	var data = {
	    images: [_spriteButton],
	    frames: { width: 48, height: 97, count: 2},
	    animations: { normal: [1], hover: [0] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var buttonContinue = new createjs.Sprite(spriteSheet, "normal");
	var helper = new createjs.ButtonHelper(buttonContinue, "normal", "hover");
	buttonContinue.x=690;
	buttonContinue.y=410;

	stage.addChild(dialog);
	stage.addChild(buttonContinue);

	buttonContinue.on("mousedown", function(evt){
		loadLevel(stage.level+1);
	});
}