var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 8000);
app.use(express.static(__dirname + '/public'));
var io = require('socket.io')(server);


console.log("----Server Running----");
io.sockets.on("connection", newConnection);

const FPS = 60;

var players = [];
var canChange = true;
var changeTics = 0;

function newConnection(socket){
	console.log("New Connection: " + socket.id);
	socket.on("sendFromClient", receivedFromClient);
	socket.on("disconnect", deleteClient);

	function receivedFromClient(newData){
		if(!dataExists(newData)){
			players.push(newData);
			if(players.length == 1){
				players[0].isIt = true;
			}
		}
		else{
			for(var i = 0; i < players.length; i++){
				if(players[i].id == newData.id){
					players[i].x = newData.x;
					players[i].y = newData.y;
					players[i].direction = newData.direction;
					players[i].aFrame = newData.aFrame;
				}
			}
		}
	}

	function deleteClient(){
		var indexOfPlayer;
		for(var i = 0; i < players.length; i++){
			if(players[i].id == socket.id){
				indexOfPlayer = i;
			}
		}
		players.splice(indexOfPlayer, 1);
	}
}

function dataExists(data){
	for(var i = 0; i < players.length; i++){
		if(players[i].id == data.id){
			return true;
		}
	}
	return false;
}

function update(){
	updateChange();
	checkCollision();
	io.sockets.emit("sendFromServer", players);
}

function updateChange(){
	if(!canChange){
		if(changeTics == 60){
			canChange = true;
			changeTics = 0;
		}
		changeTics ++;
	}
}

function checkCollision(){
	for(var i = 0; i < players.length; i++){
		for(var j = i + 1; j < players.length; j++){
			var hb1 = players[i];
			var hb2 = players[j];
			if(hb1.x < hb2.x + 40 &&
				hb1.x + 40 > hb2.x &&
				hb1.y < hb2.y + 72 &&
				hb1.y + 72 > hb2.y){
				if(players[i].isIt && canChange){
					players[j].isIt = true;
					players[i].isIt = false;
					canChange = false;
				}
				else if(players[j].isIt && canChange){
					players[i].isIt = true;
					players[j].isIt = false;
					canChange = false;
				}
			}
		}
	}
}

setInterval(update, 1000/ FPS);