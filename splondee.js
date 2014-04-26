var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var c = document.getElementById("myCanvas");
var canvas = c.getContext("2d");

var map = new Map(100, 100, 500, 250);
map.genLevel();

var FPS = 30;
setInterval(function(){
  update();
  draw();
}, 1000/FPS);

function update(){
}

function draw(){
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	map.draw();
}