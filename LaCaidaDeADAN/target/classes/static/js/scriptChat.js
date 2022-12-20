//Load items from server
function loadChat(callback) {
    $.ajax({
        url: 'http://localhost:8080/Chat'
    }).done(function (ChatMessage) {
        console.log('Chat loaded: ' + JSON.stringify(ChatMessage));
        callback(ChatMessage);
    })
}

//Create item in server
function createMessage(ChatMessage, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/Chat',
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

//Update item in server
function updateMessage(ChatMessage) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/Chat/' + ChatMessage.id,
        data: JSON.stringify(ChatMessage),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (ChatMessage) {
        console.log("Updated message: " + JSON.stringify(ChatMessage))
    })
}

//Delete item from server
function deleteMessage(ChatMessageId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/Chat/' + ChatMessageId
    }).done(function (ChatMessageId) {
        console.log("Deleted message " + ChatMessageId)
    })
}

//Show item in page
function showChat(chat) {
	
	var msFormat = '<b>' + chat.sender + ":" + '</b>' + " " + chat.message;
	
	console.log(chat.message + ": " + chat.id)
	
    $('#Chat').append(
        '<div id="message-' + chat.id + '">' + msFormat + '</div>')
       
}

function updateChatText(chat) {
	$('#message-' + chat.id).empty();
	
	console.log(chat.message + ": " + chat.id)
	var msFormat = '<b>' + chat.sender + ":" + '</b>' + " " + chat.message;
	
	$('#message-' + chat.id).append(
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
        	for (var i = 0; i < ChatMessage.length; i++) {
            	updateChatText(ChatMessage[i]);
        	}
    	});
	}, 240)

    var sender = $('#Nickname');
    var message = $('#Message');
    
    //Handle add button
    $("#SendButton").click(function () {
		var senderVal = sender.val();
		var messageVal = message.val();
		message.val('');      

        var Message = {
            message : messageVal,
            sender : senderVal 
        }
        createMessage(Message, function (MessageID) {
            showChat(MessageID);
        });
        
    })
})