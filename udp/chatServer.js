var dgram = require("dgram");
var server = dgram.createSocket("udp4");

//全局配置
var config = {'port':4321,'debug':true,'ping':false};

//客户端列表
var clientList = {},
	checkSign = null;
//检测客户端
function checkClient(){
	if(!config.ping){
		return;
	}
	var delay = 3000;
	checkSign = setTimeout(function(){
		for(var key in clientList){
			(function(client){
				client['isOneline'] = false;
				var errorFn = function(){
					client['isOneline'] = -1;
					debug('[error] remove ',clientList[key]);
					delete clientList[key];
				}
				//延时删除error事件
				setTimeout(function(){
					if(!client['isOneline']){
						debug('[timeout] remove ',clientList[key]);
						delete clientList[key];
					}
					if(client['isOneline'] != -1){
						debug('remove error');
						server.removeListener('error',errorFn);
					}
				},delay-1);
				server.on('error',errorFn);
				sendMsg(client,'ping:on',null);
			})(clientList[key]);
		}
		checkSign = setTimeout(arguments.callee,delay);
	},delay);
}
//当有用户上线时通知其它用户
function informOthers(currentClient){
	var users = [];
	for(var i in clientList){
		users.push(clientList[i]);
	}
	var currentKey = getClientKey(currentClient);
	for(var key in clientList){
		if(currentKey == key){
			continue;
		}
		//错误处理交给ping操作
		sendMsg(clientList[key],'user:'+JSON.stringify(users));
	}
}
//得客户端发送信息
function sendMsg(client,msg,callback,s){
	var message = new Buffer(msg);
	if(config.debug){
		debug('send ',client.address,client.port,msg);
	}
	var engine = s?s:server;
	engine.send(message,0,message.length,client.port,client.address,callback)
}

//输出调试信息
function debug(){
	var msg = Array.prototype.slice.call(arguments,0);
	msg.unshift('DEBUG -- ');
	console.log.apply(null,msg);
}
function getClientKey(client){
	return client?client.address.replace(/\./g,'_')+'_'+client.port:'';
}
server.on("message", function (msg,client) {
	if(config.debug){
		debug('from ',client.address,client.port,msg.toString());
	}
	msg = msg.toString();
	var charIndex = msg.indexOf(':');
	if(~charIndex){//命令格式正确
		var command = msg.substr(0,charIndex),
			content = msg.substr(charIndex+1);

		//向客户端发送格式：cammand:context
		switch (command.toLowerCase()){
			case 'connect' :
				clientList[getClientKey(client)] = client;
				checkClient();//定时检测客户端
				informOthers();
				break;
			case 'ping' : 
				var key = getClientKey(client);
				if(content != 'yes'){
					debug('[ping] remove ',clientList[key]);
					delete clientList[key];
				}else{
					clientList[key]['isOneline'] = true;
					debug('[ping]',key,'on line!');
				}
				break;
			case 'get' :
				var args = content.split('|');
				if(args.length == 2){
					//2.server->B (A want to connect with B)
					sendMsg({'address':args[0],'port':args[1]},'s_get:'+client.address+'|'+client.port);
				}
				break;
			case 'b_hole_a'://B发来的打洞成功消息
				var args = content.split('|');
				if(args.length == 2){
					//5.server->A (inform A : B burrow A successfully)
					sendMsg({'address':args[0],'port':args[1]},'s_send_b:'+JSON.stringify({'address':client.address,'port':client.port}));
				}
				break;
		}
	}
});

server.bind(config.port);
console.log('chat server started at port '+config.port+'!');
