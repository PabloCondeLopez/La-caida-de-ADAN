/*

//Load items from server
function loadChat(callback) {
    $.ajax({
        url: 'http://127.0.0.1:8080/chat'
    }).done(function (Chat) {
        console.log('Chat loaded: ' + JSON.stringify(Chat));
        callback(Chat);
    })
}

//Create item in server
function createMessage(ChatMessage, callback) {
    $.ajax({
        method: "POST",
        url: 'http://127.0.0.1:8080/chat',
        data: JSON.stringify(ChatMessage),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (ChatMessage) {
        console.log("Chat created: " + JSON.stringify(ChatMessage));
        callback(ChatMessage);
    })
}

//Update item in server
function updateMessage(ChatMessage) {
    $.ajax({
        method: 'PUT',
        url: 'http://127.0.0.1:8080/chat/' + ChatMessage.id,
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
        url: 'http://127.0.0.1:8080/chat' + ChatMessageId
    }).done(function (ChatMessage) {
        console.log("Deleted item " + ChatMessageId)
    })
}

//Show item in page
function showChat(ChatMessage) {

    var checked = '';
    var style = '';

    if (ChatMessage.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + ChatMessage.id + '"><span ' + style + '>' + ChatMessage.message + 
        '</span> <button>Delete</button></div>')
}


$(document).ready(function () {

    loadChat(function (Chat) {
        //When items are loaded from server
        for (var i = 0; i < Chat.length; i++) {
            showChat(Chat[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    /*info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var ChatDiv = elem.parent();
            var ChatMessageId = itemDiv.attr('id').split('-')[1];
            createMessage(ChatMessageId);
        }
    })*/

    //Handle items checkboxs
    /*info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var ChatDiv = checkbox.parent();

        //Read item info from elements
        
        
        var ChatMessageId = ChatDiv.attr('id').split('-')[1]; 
        var ChatMessageMessage = ChatDiv.attr('message').split('-')[1];
        var ChatMessageSender = ChatDiv.attr('sender').split('-')[1];
        var ChatMessageReceiver = ChatDiv.attr('receiver').split('-')[1];

        //Create updated item
        var updatedMessage = {
            id: ChatMessageId ,
            message: ChatMessageMessage,
            sender: ChatMessageSender,
            receiver : ChatMessageReceiver
        }

        //Update item in server
        updateMessage(updatedMessage);

        //Update page when checked
        var style = itemChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })*/
    
    /*

    //Handle add button
    $("#add-button").click(function () {
		var player1 = input.val();
		var player2 = input.val();
        var value = input.val();
        input.val('');

        var Message = {
			id : +1,
            message : value,
            sender : player1,
            receiver: player2
            
        }

        createMessage(Message, function (MessageWithId) {
            //When item with id is returned from server
            showChat(MessageWithId);
        });
    })
}) 

*/