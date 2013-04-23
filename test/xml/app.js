var http = require('http');
var server = http.createServer(function(request,response){
	if(request.method == 'GET'){
		response.writeHead(200,{'Content-Type':'text/html'});
		response.end('<form action="" method="POST"><input name="test" value="test" type="text"/><input type="submit" value="send"/></form>');
	}else{
		request.on('data',function(d){
			console.log(d.toString());
		});
		response.writeHead(200,{'Content-Type':'text/html'});
		response.end('receive');
	}
});
server.listen(8888)