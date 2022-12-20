//Load items from server
function loadUser(callback) {
    $.ajax({
        url: 'http://localhost:8080/player'
    }).done(function (Player) {
        console.log('Items loaded: ' + JSON.stringify(Player));
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
        console.log("Item created: " + JSON.stringify(Player));
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
        console.log("Updated item: " + JSON.stringify(Player))
    })
}

//Delete item from server
function deleteUser(Player) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/player/' + Player
    }).done(function (Player) {
        console.log("Deleted item " + Player)
    })
}

$(document).ready(function () {
    var user = $('#name-input')
    var passwordInput = $('#pass-input')
    
    //Handle add button
    $("#reg-button").click(function () {
		var userVal = user.val();
		user.val(''); 
		var passwordVal = passwordInput.val();
		passwordInput.val('');      

        var Player = {
            user: userVal,
            password: passwordVal
        }

        createUser(Player, function (Player) {
            //When item with id is returned from server
        });
    })
    
    $("#login-button").click(function () {
		var userVal = user.val();
		user.val(''); 
		var passwordVal = passwordInput.val();
		passwordInput.val('');      

        var Player = {
            user: userVal,
            password: passwordVal,
            connected: true
        }

        updateUser(Player);
    })
})