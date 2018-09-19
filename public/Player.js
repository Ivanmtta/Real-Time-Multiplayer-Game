function Player(x, y){

	this.x = x;
	this.y = y;
	this.isIt = false;
	this.speed = 5;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.direction = "down";
	this.playerUp = [];
	this.animationTime = 0;
	this.animationFrame = 0;

	for(var i = 0; i < 4; i++){
		this.playerUp[i] = new Image();
	}
	this.playerUp[0].src = "img/up1.png";
	this.playerUp[1].src = "img/up2.png";
	this.playerUp[2].src = "img/up3.png";
	this.playerUp[3].src = "img/up4.png";

	this.playerDown = [];
	for(var i = 0; i < 4; i++){
		this.playerDown[i] = new Image();
	}
	this.playerDown[0].src = "img/down1.png";
	this.playerDown[1].src = "img/down2.png";
	this.playerDown[2].src = "img/down3.png";
	this.playerDown[3].src = "img/down4.png";

	this.playerLeft = [];
	for(var i = 0; i < 4; i++){
		this.playerLeft[i] = new Image();
	}
	this.playerLeft[0].src = "img/left1.png";
	this.playerLeft[1].src = "img/left2.png";
	this.playerLeft[2].src = "img/left3.png";
	this.playerLeft[3].src = "img/left4.png";

	this.playerRight = [];
	for(var i = 0; i < 4; i++){
		this.playerRight[i] = new Image();
	}
	this.playerRight[0].src = "img/right1.png";
	this.playerRight[1].src = "img/right2.png";
	this.playerRight[2].src = "img/right3.png";
	this.playerRight[3].src = "img/right4.png";

	this.update = function(){
		if(this.left){
			this.x -= this.speed;
			this.direction = "left";
		}
		if(this.right){
			this.x += this.speed;
			this.direction = "right";
		}
		if(this.up){
			this.y -= this.speed;
			this.direction = "up";
		}
		if(this.down){
			this.y += this.speed;
			this.direction = "down";
		}
		this.manageAnimation();
	}

	this.manageAnimation = function(){
		if(this.animationTime == 6){
			this.animationFrame++;
			if(this.animationFrame > this.playerUp.length - 1){
				this.animationFrame = 0;
			}
			this.animationTime = 0;
		}
		this.animationTime ++;
	}

	this.getImage = function(dir, aFrame){
		if(dir == "up"){
			return this.playerUp[aFrame];
		}
		else if(dir == "down"){
			return this.playerDown[aFrame];
		}
		else if(dir == "left"){
			return this.playerLeft[aFrame];
		}
		else if(dir == "right"){
			return this.playerRight[aFrame];
		}
	}
}