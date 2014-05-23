var stage, map, editor;
init();

function init(){
	stage = new createjs.Stage("myCanvas");
	stage.enableMouseOver();
	createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(30);

	var srcMusic = "res/sound/music.mp3";
	createjs.Sound.registerSound(srcMusic);

	createjs.Sound.play(srcMusic, "none", 0, 0, -1, 0.5, 0);
 	//mainMenu();

	loadLevel(0);
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

	loadMenu();
}

function gameover(){
	var dialog = new createjs.Bitmap("res/img/backgrounds/gameover.png");

	var _spriteSlider = new Image();
	_spriteSlider.src = "res/img/buttons/continue.png";

	var data = {
	    images: [_spriteSlider],
	    frames: { width: 48, height: 97, count: 2},
	    animations: { normal: [1], hover: [0] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var buttonContinue = new createjs.Sprite(spriteSheet, "normal");
	var helper = new createjs.ButtonHelper(buttonContinue, "normal", "hover");
	buttonContinue.x=690;
	buttonContinue.y=460;

	stage.addChild(dialog);
	stage.addChild(buttonContinue);

	buttonContinue.on("mousedown", function(evt){
		levelMenu();
	});
}