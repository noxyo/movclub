<!--   Config Node.JS  -->

jQuery(function($){
	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
	var $chat = $('#chat');
	var $scroll = $('#msg-noticia');
			
	$nickForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user', $nickBox.val(), function(data){
			if(data){
        // Nada
			} else{
				$nickError.html('That username is already taken!  Try again.');
			}
		});
		$nickBox.val('');
	});
			
	socket.on('usernames', function(data){
		var html = '';
		//<div class="bubble_users">
		for(i=0; i < data.length; i++){
			html += '<div class="bubble_users"><div class="usersbubble">' + data[i] + '</div><br class="clear"></div>'
		}
		$users.html(html);
	});
		
	socket.on('connect', function(data){
	   	socket.emit('screen');
	   	console.log("Screen Connected .....");
	});
	//  Recebe do servidor no socket "controlling" e executa a função //
	socket.on('controlling', function(data){
		var myVideo=document.getElementById("video1");
		if(data.action === "playuse"){
			console.log("action playuse...");
			if (myVideo.paused)
				myVideo.load();   //  Após a pausa faz um novo reload do video, mantendo o timing do streaming
			else          		 //  para seguir directamente após o tempo de pausa usava-se  play().
				myVideo.pause();
   		}
   		//  Botao Menu Acrescentado - "toggle" das barras laterais //
   		else if(data.action === "btn_menu"){
			console.log("Screen: Botao MENU");
        	$( "#title_users" ).toggle( "slide",{direction:'right'},"slow"); /*  mudei aki users -> title_users */
          	$( "#chatWrap" ).toggle( "slide" );  /*  mudei aki chat -> chatWrap */
        }
    });

	$messageForm.submit(function(e){
      	//Nada
	});
			
	socket.on('new message', function(data){
		$chat.append('<div class="chatbubbleme"><div class="bubble_chat">' + data.nick + '</div><br class="clear">' + data.msg + "</div></div>");
		// Alterar este codigo, está a apagar a mensagem mais recente
		// testar com settimeout e o fadeout;
		$('.chatbubbleme').animate({opacity:1}, 10000, 'linear', function(){
			$('.chatbubbleme').fadeOut(10000);
		});
	});
	// Mensagem recebida de Admin para colocar nas News
	socket.on('admin news', function(data){
		$scroll.append('<div class="msg-news marquee"><marquee  loop="3">' + data + "</marquee></div>");
		$('.msg-news').fadeOut(30000);
		console.log(data);
	});
});