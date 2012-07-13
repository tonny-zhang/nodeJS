// note, io.listen(<port>) will create a http server for you
var io = require('socket.io').listen(8010);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('this', { will: 'be received by everyone' });

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});
console.log('begin');