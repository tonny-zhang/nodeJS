/*var net = require('net'),fs=require('fs');
var client = net.createConnection(8888,'10.10.30.250');
var ws = fs.createWriteStream('e:/result1.jpg');
client.on('data',function(d){
	console.log(d.length);
	ws.write(d);
});
client.on('end',function(){
	ws.end();
});*/

var net = require('net'),fs=require('fs');
var client = new net.Socket();
client.on('data',function(d){
	console.log(d.toString());
});
client.connect(8888,'localhost', function(){
	console.log('connected server!');
});
client.write('abc');