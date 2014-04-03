var canvas = $('#myCanvas');

var canvasPosition = {
    x: canvas.offset().left,
    y: canvas.offset().top
};

canvas.on('click', function(e) {

    // use pageX and pageY to get the mouse position
    // relative to the browser window

    var mouse = {
        x: e.pageX - canvasPosition.x,
        y: e.pageY - canvasPosition.y
    }

    for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(map.pos[i][j].handleClick(mouse)==true){
				if(map.pos[i][j].curColor==2)
					map.pos[i][j].curColor = 0;
				else
					map.pos[i][j].curColor++;

			}
		}
	}

});