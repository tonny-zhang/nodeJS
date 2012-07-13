var net = require('net');
try{
	var client = net.createConnection(8124,'10.10.30.250');
	}catch(e){
	console.log(123);
}
	client.on('connect',function(){
		console.log('test',arguments);
	});
	client.on('data',function(d){
		console.log('data',d.toString());
	});
	client.on('error',function(){
		console.log(1);
	});
client.write('from client');
/*var dgram = require('dgram');
var message = new Buffer("Some bytes");
var client = dgram.createSocket("udp4");
client.on("listening", function () {
  var address = client.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});
client.bind(41235);
client.send(message, 0, message.length, 41234, "119.161.212.77", function(err, bytes) {
	console.log(err,bytes,typeof bytes);
  //client.close();
});

client.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});*/