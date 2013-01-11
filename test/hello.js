

var http = require('http');
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('hello wrold\n');
});
server.listen(8888)
server.maxConnections = 20;
console.log('Server running at http://localhost:8888');

server.on('connection',function(){
	console.log(server.connections);
});
server.on('request',function(request,response){
	console.log(request.headers);
});