log = console.log;
dgram = require('dgram');
var Buffer = require('buffer').Buffer;

var endat = 10;
var count = 0;
socket = dgram.createSocket('udp4');
socket.addListener('message', function (msg, rinfo) {
  log('got message from '+ rinfo.address +' port: '+ rinfo.port);
  log('data len: '+ rinfo.size + " data: "+ msg.toString('ascii', 0, rinfo.size));
  socket.send(rinfo.port, rinfo.address, msg, 0, rinfo.size);
  count += 1
  if (count == endat) {
    socket.close();
    process.exit();
  }
});
socket.bind(8000);

setInterval(function() {
  sock = dgram.createSocket('udp4');
  var l = 8;
  buf = new Buffer(l);
  for (var i = 0; i < l; i++) {
    buf[i] = 100;
  }

  log('sending ping...');
  sock.addListener('message', function(msg, rinfo) {
    log('got pong from '+ rinfo.address +":"+ rinfo.port);
  });
  sock.send(8001, "localhost", buf, 0, buf.length);
}, 1000);