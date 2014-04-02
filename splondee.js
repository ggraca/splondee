var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 360;

var c = document.getElementById("myCanvas");
var canvas = c.getContext("2d");

var x = 0;
var map = new Map;
map.genRandom();

var FPS = 30;
setInterval(function(){
  update();
  draw();
}, 1000/FPS);

function update(){
	x++;
	if(x > CANVAS_WIDTH)
		x = 0;
}

function draw(){
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			map.draw();
		}
	}
}