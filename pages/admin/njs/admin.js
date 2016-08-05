<!--   Config Node.JS  -->

jQuery(function($){
	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	//
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
	//
	var $newsForm = $('#send-news');
	var $newsBox = $('#msg-news');
	//
	var $chat = $('#chat');
			
	$nickForm.submit(function(e){
		e.preventDefault();
		if ($nickBox.val().trim().length ==""){
			alert("Campo Vazio, Tente Outra Vez");
			$nickError.html('Campo Vazio, Tente Outra Vez.');
			e.preventDefault();
			return false;
		}
		socket.emit('new user', $nickBox.val(), function(data){
			if(data){
				$('#nickWrap').hide();
				$('#contentWrap').show();
			} else{
				$nickError.html('That username is already taken!  Try again.');
			}
		});
		$nickBox.val('');
	});
			
	socket.on('usernames', function(data){
		var html = '';
		for(i=0; i < data.length; i++){
			html += data[i] + '<br/>'
		}
		$users.html(html);
	});
	// Acrescentado funçao para admin
	socket.on('connect', function(data){
		socket.emit('admin');
		console.log("Boss Connected...");
	});
	$newsForm.submit(function(e){
		e.preventDefault();

		socket.emit('admin message', $newsBox.val());
		$newsBox.val('');
		//  Botao deixa de funcionar após o envio da mensagem até esta desaparecer
		$('#btn_news').attr('disabled', 'disabled');
		setTimeout(function() {
			$('#btn_news').removeAttr('disabled');
		},30000);				
	});
	//
	// enviar comando remoto no botao
	$('#btn_playPause').click(function(e){
	    socket.emit('controll', {action:"playPause"});
	});
	// enviar comando remoto no botao
	$('#btn_menu').click(function(e){
	    socket.emit('controll', {action:"btn_menu"});
	});
	// enviar comando remoto no botao //
	$messageForm.submit(function(e){
		e.preventDefault();
		socket.emit('send message', $messageBox.val());
		$messageBox.val('');
	});
			
	socket.on('new message', function(data){
      // Deixa de mostrar mensagens na div <chat>
	});
});

