var http = require('http');
var net = require('net');
var url = require('url');

function proxy(requestUrl,method,parameters){
  
}
// Create an HTTP tunneling proxy
var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});
proxy.on('connect', function(req, cltSocket, head) {
  console.log(req.headers,head.toString(),'===');
  // connect to an origin server
  var srvUrl = url.parse(req.headers.proxy_href);console.log(srvUrl);
  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function() {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
  // srvUrl.method = 'GET';
  // var req = http.request(srvUrl);
  // req.end();
  // req.on('connect',function(res,srvSocket,head){
  //   cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
  //                   'Proxy-agent: Node-Proxy\r\n' +
  //                   '\r\n');
  //   srvSocket.write(head);
  //   srvSocket.pipe(cltSocket);
  //   cltSocket.pipe(srvSocket);
  //   console.log('req connect');
  // });
});
proxy.listen(1337, '127.0.0.1', function() {
  var options = {
      port: 1337,
      hostname: '127.0.0.1',
      method: 'CONNECT'
    };
    options.headers={proxy_href : 'http://localhost:3000/test'};
  var req = http.request(options);
    req.end();

    req.on('error',function(){
      console.log(options,arguments);
    });
    req.on('connect', function(res, socket, head) {
      console.log('got connected!');
    });
});
// now that proxy is running
// proxy.listen(1337, '127.0.0.1', function() {

//   // make a request to a tunneling proxy
//   var options = {
//     port: 1337,
//     hostname: '127.0.0.1',
//     method: 'CONNECT',
//     path: ('localhost:3000'),
//     headers: {
//       proxy_host: 'localhost:3000',
//       proxy_path: '/test?a=1',
//       proxy_href: 'http://localhost:3000/test?a=1'
//     }
//   };

//   var req = http.request(options);
//   req.end();

//   req.on('error',function(){
//     console.log(options,arguments);
//   });
//   req.on('connect', function(res, socket, head) {
//     console.log('got connected!');

//     // make a request over an HTTP tunnel
//     socket.write('GET /test.upload.node HTTP/1.1\r\n' +
//                  'Host: localhost:3000\r\n' +
//                  'Connection: close\r\n' +
//                  '\r\n');
//     var proxyResult = '';
//     socket.on('data', function(chunk) {
//       proxyResult = chunk.toString();
//       console.log(proxyResult);
//     });
//     socket.on('end', function() {

//       proxy.close();
//     });
//   });
// });

