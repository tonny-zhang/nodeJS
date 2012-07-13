var dgram = require("dgram");

var server = dgram.createSocket("udp4");
/*
server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});


// server listening 0.0.0.0:41234
*/
server.bind(41233);
var msg = new Buffer('test');
server.send(msg,0,msg.length,'8124','10.10.30.250',function(err,bytes){
	console.log(err,bytes.toString());
})
server.on('error',function(){
	console.log('error');
});