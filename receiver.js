function Receiver(pos, img){
	this.pos = pos;
	this.sprite = new createjs.Bitmap("res/img/" + img + ".png");
	this.sprite.x = 50*pos;

	this.receive = function(pos){
		alert("GG");
	}
}