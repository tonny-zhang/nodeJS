/*var net = require('net'),fs=require('fs');
var server = net.createServer(function(socket){
	var fileReadStream = fs.createReadStream('E:/1.jpg');
	fileReadStream.pipe(socket);
	fileReadStream.on('close',function(){
		console.log('文件传输完成');
	});
});
server.listen(8888);
*/

var net = require('net'),fs=require('fs');
var server = net.createServer(function(socket){
	socket.write('from server');
});
server.on('data',function(d){
	console.log(d.toString());
});
server.listen(8888);