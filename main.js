var stage, map;
init();

function init(){
	stage = new createjs.Stage("myCanvas");
	createjs.Ticker.addEventListener("tick", update);
	stage.enableMouseOver();

	loadLevel();
}

function update(){
	map.update();
	stage.update();
}

function loadLevel(){
	map = new Map();
	map.generate();

	stage.addChild(map.matrixStage);
	map.matrixStage.x = 125;
	map.matrixStage.y = 150;

	stage.addChild(map.drinkStage);
	map.drinkStage.x = 150;
	map.drinkStage.y = 25;

	stage.addChild(map.cocktailStage);
	map.cocktailStage.x = 125;
	map.cocktailStage.y = 400;
}