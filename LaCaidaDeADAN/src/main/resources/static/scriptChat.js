//Load items from server
function loadChat(callback) {
    $.ajax({
        url: 'http://localhost:8080/Chat'
    }).done(function (ChatMessage) {
        console.log('Items loaded: ' + JSON.stringify(ChatMessage));
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
        console.log("Item created: " + JSON.stringify(ChatMessage));
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
        console.log("Updated item: " + JSON.stringify(ChatMessage))
    })
}

//Delete item from server
function deleteMessage(ChatMessageId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/Chat/' + ChatMessageId
    }).done(function (ChatMessage) {
        console.log("Deleted item " + ChatMessageId)
    })
}

//Show item in page
function showChat(chat) {
    $('#chat').append(
        '<div id="message-' + chat.id + '">' + chat.message +
        '</div>')
}

$(document).ready(function () {


    loadChat(function (ChatMessage) {
        //When items are loaded from server
        for (var i = 0; i < ChatMessage.length; i++) {
            showChat(ChatMessage[i]);
        }
    });

    var user = $('#user-input')
    var message = $('#message-input')
    
    //Handle add button
    $("#send-button").click(function () {
		var userVal = user.val();
		var messageVal = message.val();
		message.val('');      

        var Message = {
            message : messageVal,
            sender : userVal 
        }

        createMessage(Message, function (MessageWithId) {
            //When item with id is returned from server
            showChat(MessageWithId);
        });
    })
})