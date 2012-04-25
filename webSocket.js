var http = require("http"),
    io = require("socket.io");
 
// Create HTTP server
var server = http.createServer(function(request, response) {
    response.writeHead({ "Content-Type": "text/html" });
    response.end("HTML5 WebSocket Demo");
});
server.listen(8000, "localhost");
 
// Wrap HTTP server by socket.io
var socket = io.listen(server);
socket.on("connection", function(client) {
    console.log("connected");
 
    client.on("message", function(data) {
        client.send("Hello " + data);
    });
 
    client.on("disconnect", function() {
        console.log("disconnected");
    });
});