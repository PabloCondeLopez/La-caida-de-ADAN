//Load items from server
function loadUser(callback) {
    $.ajax({
        url: 'http://localhost:8080/player'
    }).done(function (Player) {
        console.log('Users loaded: ' + JSON.stringify(Player));
        callback(Player);
    })
}

//Create item in server
function createUser(Player, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/player',
        data: JSON.stringify(Player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (Player) {
        console.log("User created: " + JSON.stringify(Player));
        callback(Player);
    })
}

//Update item in server
function updateUser(Player) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/player',
        data: JSON.stringify(Player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (Player) {
        console.log("Updated user: " + JSON.stringify(Player))
    })
}

//Delete item from server
function deleteUser(Player) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/player/' + Player
    }).done(function (Player) {
        console.log("Deleted user " + Player)
    })
}

function showUser(User) {
	let estado = '';
	
	if(User.connected === true){
		estado = 'Conectado';
	} else {
		estado = 'Desconectado';
	}
	
	$('#Players').append('<div id="player-' + User.id + '">' + 'Nombre: ' + User.user + ' | Estado: ' + estado + '</div>')
}

$(document).ready(function () {
	loadUser(function(Player) {
		for (var i = 0; i < Player.length; i++) {
            showUser(Player[i]);
        }
	})
	
	setInterval(function() {
		loadUser(function(Player) {
			$('#Players').empty();
			for (var i = 0; i < Player.length; i++) {
            	showUser(Player[i]);
        	}
		})
	}, 1000);
	
    var user = $('#Username')
    
    //Handle add button
    $("#EnterButton").click(function () {
		var userVal = user.val();
		user.val(''); 

        var Player = {
            user: userVal,
        }

        createUser(Player, function (Player) {
            showUser(Player)
        });
    })
    
    $("#ConnectionButton").click(function () {
		var userVal = user.val();
		user.val('');  

        var Player = {
            user: userVal,
            connected: true
        }

        updateUser(Player);
    })
})