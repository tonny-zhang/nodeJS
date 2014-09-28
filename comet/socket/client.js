var net = require('net'),fs=require('fs');

var Client = function(i){
	var index = i;
	var client = new net.Socket();
	client.on('data',function(d){
		console.log(i+" receive->"+d.toString());
	});
	client.connect(8888,'localhost', function(){
		console.log('connected server!');
	});
	function send(msg){
		console.log(index+" send msg:"+msg);
		client.write(msg);
	}
	var Chat = {
		'login': function(){
			var date = new Date();
			var user_id = [[date.getFullYear(),date.getMonth()+1+date.getDate()].join('-'),[date.getHours(),date.getMinutes(),date.getSeconds()].join('-')].join('_');
			send('login::user_'+user_id);
		},
		'user_list': function(){
			send('user_list::');
		},
		'send_to': function(to_user,msg){
			send('send_to::'+to_user+'::'+msg);
		},
		'send': send
	};
	this.Chat = Chat;
}



function readSyn() {  
   process.stdin.pause();  
   var response = fs.readSync(process.stdin.fd, 1000, 0, "utf8");  
   process.stdin.resume();  
   return response[0].trim();
}

var num = 100;
while(num-- > 0){
	new Client(num);
	console.log(num);
}
// var client = new Client(-1);
// setTimeout(function(){
// 	client.Chat.send('end');
// },500);

