

var http = require('http');
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	var formStr = '<form action="" method="POST"><input name="type" value="test"/><input type="submit" value="submit"/></form>';
	response.end('hello wrold\n'+formStr);
});
server.listen(8888)
server.maxConnections = 20;
console.log('Server running at http://localhost:8888');

server.on('connection',function(){
	console.log('connection',server.connections);
});
server.on('request',function(request,response){
	if(request.method == 'POST'){
		//这里我们可以获得post传过来的参数
		request.on('data',function(data){
			console.log('on data',data.toString());
		});
		request.on('end',function(){
			console.log('on end',arguments);
		});
		//console.log(request,'============\n\n\n');return;
	}
	
	// console.log(request.headers);
});