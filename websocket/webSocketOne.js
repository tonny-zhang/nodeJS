var conns = new Array();

var ws = require('websocket-server');

var server = ws.createServer();

server.addListener('connection', function(conn){
	console.log('connection....');
	conn.send(conn.id);
	conns.push(conn);
	conn.addListener('message',function(msg){
		console.log(msg);
		for(var i=0; i<conns.length; i++){
			if(conns[i]!=conn){
				conns[i].send(msg);
			}
		}
	});
});
server.addListener("error", function(){

  console.log(Array.prototype.join.call(arguments, ", "));

});
server.listen(8080);

console.log('running......');
