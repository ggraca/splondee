function Drink(x, y, j){
	GameObject.apply(this, [x, y, 100, 125]);
	this.sprite = new Image();
	this.sprite.src = "res/img/Drink.png";

	this.draw = function(){
		canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height);
	}
}