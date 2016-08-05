var express = require('express');


var http = require('http');
var path = require('path');
var async = require('async');
var socketio = require('socket.io');


var	app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
	// criar uma lista de nicknames //
var	nicknames =[];
var ss = sockets;
var sockets = [];



//Socket.io Config
io.set('log level', 1);

//Routes


app.use(express.static(path.resolve(__dirname, 'pages')));


app.get('/cliente', function (req, res) {
  res.sendfile(__dirname + '/pages/client/cliente.html'); // User: Client
});

app.get('/screen', function(req, res) {
	res.sendfile(__dirname + '/pages/screen/screen.html'); // TV Screen
});

app.get('/admin', function (req, res) {
  res.sendfile(__dirname + '/pages/admin/index.html');	// User: TV Admin
});

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		// verificar se existe o mesmo nick ligado //
		if(nicknames.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			// atribuir a cada nick o seu socket //
			socket.nickname = data;
			nicknames.push(socket.nickname);
			updateNicknames();
		}
	});

	socket.on("screen", function(data){
		socket.type = "screen";
		ss = socket;
		console.log("Screen ready..."); 	//  Avisa na console quando o socket "screen" conecta
		showUsers();
	});
	socket.on("cliente", function(data){
		socket.type = "cliente";
		console.log("Cliente ready...");	//  Avisa na console quando o socket "cliente" conecta
	});
	socket.on("admin", function(data){
		socket.type = "admin";
		console.log("Boss is ready...");	//  Avisa na console quando o socket "admin" conecta
	});

	// Remote (Socket "controll") ==> o Servidor ==>  (Socket "controlling") Screen  //
	socket.on("controll", function(data){
		console.log(data);
		// alterado aqui socket "admin" == socket "remote"
		if(socket.type === "remote" || socket.type == "admin"){
			if(data.action === "playPause"){						// Comando remoto recebido - Função: "playPause"
				if(ss != undefined){
					ss.emit("controlling", {action:"playuse"});
				}
				console.log("Remote action... Button: Play/Pause");
			}
			//  botao MENU: Chat Hide/Show //
			if(data.action === "btn_menu"){							// Comando remoto recebido - Função: "btn_menu"
				if(ss != undefined){
					ss.emit("controlling", {action:"btn_menu"});
				}
				console.log("Remote action... Button: Chat: HIDE/SHOW");
			}
    	}
	});

  // função para actualizar a lista de utilizadores //
  function updateNicknames(){
    io.sockets.emit('usernames', nicknames);
  }
  // função para loading da lista de utilizadores //
  function showUsers () {
  	io.sockets.emit('usernames', nicknames);
  }

  // Recebe mensagem do Admin e retorna para o screen - Mensagem Scrolling
  socket.on('admin message', function(data){
  	io.sockets.emit('admin news', data);
  	console.log(data);
  });
  // Passagem das mensagens de Chat
  socket.on('send message', function(data){
    io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    updateNicknames();
	});
    
  socket.on('disconnect', function(data){
    if(!socket.nickname) return;  //utilizadores que não entram no chat //
    nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    updateNicknames();
  });
});
// Cloud 9 config.
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});