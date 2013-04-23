
var i = 0;
var one = +new Date();
process.nextTick(function(){
	console.log(i,+new Date()-one);
});


function doSomething(callback) {
    setTimeout(function () {
        console.log('doing');
    }, 1000);
    process.nextTick(callback);
}

console.log('before doing');

doSomething(function () {
    console.log('done');
});

var http = require('http');

var wait = function(mils) {
    var now = new Date;
    while(new Date - now <= mils);
};

function compute() {
    // performs complicated calculations continuously
    console.log('start computing');
    wait(1000);
    console.log('working for 5s, nexttick');
    process.nextTick(compute);
}

http.createServer(function(req, res) {
	var delay = 1000*2;
    res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
	res.write("Sleeping for " + delay + " milliseconds...");
	setTimeout(function() {
		res.end();
		console.log('response.end()');
	}, delay);
}).listen(5000, '127.0.0.1');

//compute();