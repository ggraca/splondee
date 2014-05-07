function strToCoord(origin, str){
	var x = origin.x;
	var y = origin.y;

	switch(str){
		case "top":
			y -= 1;
			break;
		case "down":
			y += 1;
			break;
		case "left":
			x -= 1;
			break;
		case "right":
			x += 1;
			break;
		default:
			return null;
			break;
	}

	return {x: x, y: y};
}

function relation(a, b){
	if(b.y == a.y-1)
		return "top";
	else if(b.y == a.y+1)
		return "down";
	else if(b.x == a.x-1)
		return "left";
	else if(b.x == a.x+1)
		return "right";
	return "unknown";
}