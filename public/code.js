var socket;

var frame = document.getElementById("frame");
var graphics = frame.getContext("2d");
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);
graphics.imageSmoothingEnabled = false;

var player;

var backgroundImage = new Image();
backgroundImage.src = "img/background.png";
var playerMarker = new Image();
playerMarker.src = "img/marker.png";
var itMarker = new Image();
itMarker.src = "img/itmarker.png";

window.onload = function(){
	player = new Player(Math.floor(Math.random() * frame.width - 40), Math.floor(Math.random() * frame.height - 72));
	socket = io.connect(window.location.host);
	socket.on("sendFromServer", receivedInformation);
}

function sendInformation(){
	var data = {
		x: player.x,
		y: player.y,
		isIt: player.isIt,
		direction: player.direction,
		aFrame: player.animationFrame,
		id: socket.id
	}
	socket.emit("sendFromClient", data);
}

function receivedInformation(newData){
	for(var i = 0; i < newData.length; i++){
		if(newData[i].id == socket.id){
			if(newData[i].isIt){
				player.speed = 2;
			}
			else{
				player.speed = 5;
			}
		}
	}
	player.update();
	sendInformation();
	draw(newData)
}

function draw(players){
	graphics.clearRect(0, 0, frame.width, frame.height);
	graphics.drawImage(backgroundImage, 0, 0, frame.width, frame.height);
	for(var i = 0; i < players.length; i++){
		if(players[i].isIt){
			graphics.drawImage(itMarker, players[i].x, players[i].y + 60, 40, 16);
		}
		if(players[i].id == socket.id){
			graphics.drawImage(playerMarker, players[i].x + 8, players[i].y - 24, 24, 16);
		}
		graphics.drawImage(player.getImage(players[i].direction, players[i].aFrame), players[i].x, players[i].y, 40, 72);
	}
}

function keyPressed(event){
	if(event.keyCode == 87){
		player.up = true;
	}
	if(event.keyCode == 83){
		player.down = true;
	}
	if(event.keyCode == 65){
		player.left = true;
	}
	if(event.keyCode == 68){
		player.right = true;
	}
}

function keyReleased(event){
	if(event.keyCode == 87){
		player.up = false;
	}
	if(event.keyCode == 83){
		player.down = false;
	}
	if(event.keyCode == 65){
		player.left = false;
	}
	if(event.keyCode == 68){
		player.right = false;
	}
}