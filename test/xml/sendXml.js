var http = require('http');
var req = http.request({
	hostname: 'localhost',
	port: 1337,
	path: '/',
	method: 'POST',
	headers: {
		"Content-Type": "text/xml"
	}
},function(res){
	res.on('data',function(d){
		console.log(d.toString());
	});
	console.log('post receive');
});
// req.write('<xml>'+
// '<ToUserName><![CDATA[toUser]]></ToUserName>'+
// '<FromUserName><![CDATA[fromUser]]></FromUserName>'+
// '<CreateTime>1351776360</CreateTime>'+
// '<MsgType><![CDATA[link]]></MsgType>'+
// '<Title><![CDATA[公众平台官网链接]]></Title>'+
// '<Description><![CDATA[公众平台官网链接]]></Description>'+
// '<Url><![CDATA[url]]></Url>'+
// '<MsgId>1234567890123456</MsgId>'+
// '</xml> ');

req.write('<xml>'+
		'<files>'+
		'<file>one</file>'+
		'<file>two</file>'
		+'</files>'+
	'</xml>');
req.end();

// var url = require('url');
// var str = '?test=123&abc=123';
// console.log(url.parse(str));
// console.log(url.parse(str,true));
// console.log(url.parse(str,true,true));

// var crypto = require('crypto');
// var params = {
// 	nonce: 'test',
// 	timestamp: +new Date(),
// 	token: 'tonnyzhang'
// }
// var sha1Str = [params.nonce,params.timestamp,'tonnyzhang'].sort().join();
// params.signature = crypto.createHash('sha1').update(sha1Str).digest('hex');
// var arr = [];
// for(var i in params){
// 	arr.push(i+'='+params[i]);
// }
// console.log(arr.join('&'));