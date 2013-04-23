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
	var srcUrl = url.parse(req.headers.proxy_href);
	console.log('srcurl',srcUrl);
	    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
	                    'Proxy-agent: Node-Proxy\r\n' +
	                    '\r\n');
	var srcSocket = net.connect(srcUrl.port, srcUrl.hostname, function() {
	    srcSocket.write(head);
	    srcSocket.pipe(clientSocket);
	    clientSocket.pipe(srcSocket);
	});
});
proxyServer.listen(PROXY_SERVER_PORT, PROXY_HOST, function() {
	console.log('proxyServer started at ',PROXY_HOST+':'+PROXY_SERVER_PORT);
	proxy('http://localhost:3000/test.upload.node');
});

function proxy(requestUrl,method,parameters){
	var srcUrl = url.parse(requestUrl);
	// make a request to a tunneling proxy
	/*
	http里的CONNECT方法,参考：
	http://www.ietf.org/rfc/rfc2817.txt
	http://www.codingforums.com/showthread.php?t=174383
	 */
	var options = {
		port: PROXY_SERVER_PORT,
		hostname: PROXY_HOST,
		method: 'CONNECT',
		path: srcUrl.host,
		headers: {
			proxy_href: srcUrl.href
		}
	};
	
	var req = http.request(options);
	req.end();
	req.on('error',function(){
		console.log(options,arguments);
	});
	req.on('connect', function(res, socket, head) {
		// make a request over an HTTP tunnel
		socket.write((method||'GET').toUpperCase()+' '+srcUrl.path+' HTTP/1.1\r\n' +
		             'Host: '+srcUrl.host+'\r\n' +
		             'Connection: close\r\n' +
		             '\r\n');

		var proxyResult = '';
		socket.on('data', function(chunk) {
		  proxyResult = chunk.toString();
		  console.log(proxyResult);
		});
		socket.on('end', function() {
		  //proxy.close();
		});
	});
}