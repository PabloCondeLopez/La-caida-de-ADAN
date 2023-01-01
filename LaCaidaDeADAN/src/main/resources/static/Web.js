//WEBSOCKETS

var newEnemy = new WebSocket('ws://127.0.0.1:8080/enemy');
var buyTurret = new WebSocket('ws://127.0.0.1:8080/buy');
var sellTuret =new WebSocket('ws://127.0.0.1:8080/sell');
var looseGame =new WebSocket('ws://127.0.0.1:8080/lost');
var upgradeTurret=new WebSocket('ws://127.0.0.1:8080/upgrade');
//var online = new WebSocket('ws://127.0.0.1:8080/online');

