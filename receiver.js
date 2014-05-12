function Receiver(pos, img, liq){
	this.liq = liq;
	this.pos = pos;
	this.sprite = new createjs.Bitmap("res/img/" + img + ".png");
	this.sprite.x = 50*pos;

	this.receive = function(pos, liq){
		var n = this.liq.length;
		if(this.liq.length != liq.length){
			alert("BG");
			return;
		}

		for(var i = 0; i < n; i++){
			if(liq[i] != this.liq[i]){
				alert("BG");
				return;
			}
		}

		alert("GG");
	}
}