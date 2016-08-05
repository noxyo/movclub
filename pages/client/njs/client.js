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
	// Remote Estabeleceu Ligação //
	socket.on('connect', function(data){
		socket.emit('cliente');
		console.log("Cliente Connected .....");
	});
			
	$messageForm.submit(function(e){
		e.preventDefault();
		socket.emit('send message', $messageBox.val());
		$messageBox.val('');
	});
			
	socket.on('new message', function(data){
    // Deixa de mostrar mensagens na div <chat>
	});
});
