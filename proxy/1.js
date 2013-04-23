var http = require('http');
var net = require('net');
var url = require('url');

var PROXY_SERVER_PORT = 1338,
	PROXY_HOST = '127.0.0.1';

var proxyServer = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('okay');
	console.log('http listen');
});
proxyServer.on('connect', function(req, clientSocket, head) {
	req.on('data',function(data){
		console.log(data.toString());
	});
	//var srcUrl = url.parse(req.headers.proxy_href);
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node-Proxy\r\n' +
                    '\r\n');
    console.log('proxy connect',req.url);
});
proxyServer.listen(PROXY_SERVER_PORT, PROXY_HOST, function() {
	console.log('proxyServer started at ',PROXY_HOST+':'+PROXY_SERVER_PORT);
	// var req2 = http.request ({
	// 	'host' : PROXY_HOST,
	// 	'port' : PROXY_SERVER_PORT,
	// 	'method' : 'CONNECT',
	// 	'headers' : {
	// 		'Referer' : 'http://localhost/test'
	// 	}
	// },function (res2) {
	// 	console.log(res2);
	// });
	// req2.end();
	var srcSocket = net.connect(PROXY_SERVER_PORT, PROXY_HOST, function() {
		console.log('get proxy connect');
	    srcSocket.write('GET / HTTP/1.1\r\n' +
		             'Host: localhost:3000\r\n' +
		             'Connection: close\r\n' +
		             '\r\n');
	   	srcSocket.on('data',function(data){
	   		console.log(data.toString());
	   	})
	});
});
