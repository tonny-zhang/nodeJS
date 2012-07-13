var dgram = require('dgram');
var one = dgram.createSocket('udp4'),
	two = dgram.createSocket('udp4'),
	three = dgram.createSocket('udp4');

function messageFn(msg,info){
	msg = msg.toString();
	
	console.log('from',info.address,info.port,'msg:',msg);
}
one.on('message',messageFn);
two.on('message',messageFn);
three.on('message',messageFn);

one.bind(8110);
two.bind(8111);
three.bind(8112);

var msg = new Buffer('from client one 1');
one.send(msg,0,msg.length,4000,'119.161.212.77',function(){
	console.log('one ',arguments);
});
msg = new Buffer('from client one 2');
two.send(msg,0,msg.length,4001,'119.161.212.77',function(){
	console.log('one',arguments);
});
msg = new Buffer('from client one 3');
three.send(msg,0,msg.length,4002,'119.161.212.77',function(){
	console.log('one',arguments);
});
