var net = require('net'),fs=require('fs');
var clients = [];
var server = net.createServer(function(socket){
	socket.on('data',function(d){
		var data = d.toString();
		console.log(data);
		if(data == 'end'){
			console.log('client num:',clients.length);
			for(var i = 0,j=clients.length;i<j;i++){
				console.log('send to client '+i);
				clients[i].write('server send '+i);
			}
		}
	});
	clients.push(socket);
	console.log(clients.length);
	socket.write('from server'+clients.length);
});

server.listen(8888);

