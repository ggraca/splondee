var stage, map;
init();

function init(){
	stage = new createjs.Stage("myCanvas");
	stage.enableMouseOver();
	createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(30);

	//mainMenu();
	loadLevel();
}

function update(){
	if(map != null){
		map.update();
	}
	stage.update();
}

function loadLevel(){
	stage.removeAllChildren();

	var background = new createjs.Bitmap("res/img/backgrounds/gameplay.png");
	stage.addChild(background);

	map = new Map();

	stage.addChild(map.matrixStage);
	stage.addChild(map.drinkStage);
	stage.addChild(map.cocktailStage);
}

function gameover(){
	alert("you failed!");
}