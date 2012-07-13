var dgram = require("dgram");
var inStream = process.stdin,
	outStream = process.stdout;
var config = {'debug' : true};

function sendMsg(toClient,msg,callback){
	var message = new Buffer(msg);
	var result = client.send(message, 0, message.length, toClient.port, toClient.address, callback);
	debug('send',toClient.address,toClient.port,'msg:',msg);
}
inStream.resume();

inStream.on('data',function(msg){
	msg = msg.toString();
	var args = msg.split(' '),
		argsLen = args.length;
	var command = args[0];
	debug('you entered',command);
	switch(command){
		case 'get' :
			if(argsLen == 2){
				var index = args[1];//得到要连接的索引
				if(index >= 1 && index <= usersOnLine.length){
					var toClient = usersOnLine[index-1];
					//1.A->server (request purrow to B)
					//这里的洞应该由B主动打
					var msg = 'get:'+toClient.address+'|'+toClient.port;
					sendMsg(toClient,msg);
					sendMsg(currentHost,msg);//请求和目标机建立连接
				// 	var timeId = setTimeout(function(){
				// 		if(holdInfoArr[toClient.address+':'+toClient.port]){
				// 			clearTimeout(timeId);
				// 			return;
				// 		}
				// 		sendMsg(toClient,msg);
				// 		sendMsg(currentHost,msg);//请求和目标机建立连接
				// 		setTimeout(arguments.callee,500);
				// 	},500);
				}else{
					writeMsg('index must be 1-'+usersOnLine.length+'!');
				}
			}else{
				writeMsg('Your command is wrong!');
			}
			break;
		case 'send' :
			if(argsLen == 3){
				var index = args[1];//得到要连接的索引
				if(index >= 1 && index <= usersOnLine.length){
					var toClient = usersOnLine[index-1];
					if(holdInfoArr[toClient.address+':'+toClient.port]){
						sendMsg(toClient,'c_send:'+args[2]);
					}else{
						writeMsg(toClient,'no hold!');
					}					
				}else{
					writeMsg('the second arguments must be 1-'+usersOnLine.length+'!');
				}
			}else{
				writeMsg('Your command is wrong!');
			}
			break;
	}
	writeMsg('Enter:');
});

function writeMsg(){
	var msg = Array.prototype.slice.call(arguments,0);
	console.log.apply(null,msg);
}
//输出调试信息
function debug(){
	if(config.debug){
		var msg = Array.prototype.slice.call(arguments,0);
		msg.unshift('DEBUG -- ');
		console.log.apply(null,msg);
	}
}

var client = dgram.createSocket("udp4");
var usersOnLine = null;
var holdInfoArr = {};
client.on("message",function(msg,info){
	msg = msg.toString();
	
	debug('from',info.address,info.port,'msg:',msg);

	var charIndex = msg.indexOf(':');
	if(~charIndex){//命令格式正确
		var command = msg.substr(0,charIndex),
			content = msg.substr(charIndex+1);

		switch(command){
			case 'ping' :
				if(content == 'on'){
					sendMsg(currentHost,'ping:yes');
				}
				break;
			case 'user' :
				usersOnLine = JSON.parse(content);
				writeMsg(usersOnLine.length+' users on line,please enter you want send user index:');
				break;
			case 's_get' : //服务机发来另一个客户端请求
				var args = content.split('|');//A client
				if(args.length == 2){
					//3.B->A (set session on NB to NA)
					//向请求客户机发包，但这个包会被目标机丢弃
					var toPort = parseInt(args[1]);
					var toClient = {'address':args[0]};

					var timeId = setTimeout(function(){
						sendMsg({'address':args[0],'port':toPort},'a_hold_b:hold');
						toPort = toPort<65534?++toPort:1;
						if(holdInfoArr[info.address+':'+info.port] || toPort == args[1]){
							clearTimeout(timeId);
						}
						setTimeout(arguments.callee,10);
					},10);
				}
				break;
			case 'b_yes_a' ://目标机发来的确认信息
				if(content == 'yes'){
					holdInfoArr[info.address+':'+info.port] = true;
					writeMsg('hold successfully!');
				}
				break;
			case 'a_hold_b' :
				if(content == 'hold'){
					sendMsg(info,'b_yes_a:yes');
				}
				break;
			case 's_send_b' : 
				var clientB = JSON.parse(content);
				sendMsg(clientB,'msg:hello b,I am from A!');
				//writeMsg('you can communicat with','"'+info.address+':'+info.port+'"');
				break;
			case 'msg' :
				writeMsg('"'+info.address+':'+info.port+'"',' to you:',content);
				sendMsg({'address':info.address,'port':info.port},'Nice to meet you!');
				break;
			case 'c_send' :
				writeMsg('"'+info.address+':'+info.port+'"',' to you:',content);
				break;
		}
	}
});
client.on("close",function(msg,info){
	console.log(msg.toString(),'--',info);
});
client.on('listening',function(){
	var address = client.address();
	console.log("client running " + address.address + ":" + address.port);
});
var port = 9101;
(function(){
	function bind(){
		client.bind(port++);
	}
	client.on('error',function(e){
		if(e.code == 'EADDRINUSE'){
			bind();
		}
	});
	bind();
})();
var outerNet = {'address':'119.161.212.77','port':4321};
var locahost = {'address':'localhost','port':4321};
var currentHost = outerNet;
//var currentHost = locahost;
sendMsg(currentHost,'connect:set');
//sendMsg({'address':'119.161.212.77','port':4125},'connect:set');