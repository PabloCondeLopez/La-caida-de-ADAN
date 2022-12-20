function loadChat(callback) {
    $.ajax({
        url: ip + '/Chat'
    }).done(function (ChatMessage) {
        console.log('Chat loaded: ' + JSON.stringify(ChatMessage));
        callback(ChatMessage);
    }).fail(function() {
		$('#Info').empty();
		$('#Info').append("<p>Servidor desconectado</p>");
	})
}

function createMessage(ChatMessage, callback) {
    $.ajax({
        method: "POST",
        url: ip + '/Chat',
        data: JSON.stringify(ChatMessage),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (ChatMessage) {
        console.log("Message created: " + JSON.stringify(ChatMessage));
        callback(ChatMessage);
    })
}

function updateMessage(ChatMessage) {
    $.ajax({
        method: 'PUT',
        url: ip + '/Chat' + ChatMessage.id,
        data: JSON.stringify(ChatMessage),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (ChatMessage) {
        console.log("Updated message: " + JSON.stringify(ChatMessage))
    })
}

function deleteMessage(ChatMessageId) {
    $.ajax({
        method: 'DELETE',
        url: ip + '/Chat' + ChatMessageId
    }).done(function (ChatMessageId) {
        console.log("Deleted message " + ChatMessageId)
    })
}

function showChat(chat) {
	var msFormat = '<b>' + chat.sender + ":" + '</b>' + " " + chat.message;
	
    $('#Chat').append(
        '<div id="message-' + chat.id + '">' + msFormat + '</div>')
}

$(document).ready(function () {
    loadChat(function (ChatMessage) {
        for (var i = 0; i < ChatMessage.length; i++) {
            showChat(ChatMessage[i]);
        }
    });
    
    setInterval(function() {
		loadChat(function (ChatMessage) {
			$('#Chat').empty();
			
        	for (var i = 0; i < ChatMessage.length; i++) {
            	showChat(ChatMessage[i]);
        	}
    	});
	}, 1000)

    var sender = $('#Nickname');
    var message = $('#Message');
    
   
    $("#SendButton").click(function () {
		var senderVal = sender.val();
		var messageVal = message.val();
		message.val('');
		
		if(senderVal === ''){
			$('#Info').empty();
			$('#Info').append("<p>Nombre no valido</p>");
			return;
		}
		
		if(messageVal === ''){
			$('#Info').empty();
			$('#Info').append("<p>Mensaje no valido</p>");
			return;
		}

        var Message = {
            message : messageVal,
            sender : senderVal 
        }
        createMessage(Message, function (MessageID) {
            showChat(MessageID);
        });
        
    })
})