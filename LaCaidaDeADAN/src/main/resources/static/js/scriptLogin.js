/*

let ip = 'http://localhost:8080';

function loadUser(callback) {
    $.ajax({
        url: ip + '/player'
    }).done(function (Player) {
        console.log('Users loaded: ' + JSON.stringify(Player));
        callback(Player);
    })
}

function createUser(Player, callback) {
    $.ajax({
        method: "POST",
        url: ip + '/player',
        data: JSON.stringify(Player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (Player) {
        console.log("User created: " + JSON.stringify(Player));
        callback(Player);
    }).fail(function() {
		$('#Info').empty();
		$('#Info').append("<p>Usuario existente</p>");
	})
}


function updateUser(Player) {
    $.ajax({
        method: 'PUT',
        url: ip + '/player',
        data: JSON.stringify(Player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (Player) {
        console.log("Updated user: " + JSON.stringify(Player))
    }).fail(function () {
		$('#Info').empty();
		$('#Info').append("<p>Usuario no encontrado</p>");
	})
}

function deleteUser(Player) {
    $.ajax({
        method: 'DELETE',
        url: ip + '/player' + Player
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
		
		if(userVal == ""){
			$('#Info').empty();
			$('#Info').append("<p>Nombre no valido</p>");
			return;
		}

        var newPlayer = {
            user: userVal,
        }

        createUser(newPlayer, function (Player) {
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

*/