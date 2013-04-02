var http = require('http');

var url = "http://s.click.taobao.com/t?e=zGU34CA7K%2BPkqB07S4%2FK0CITy7klxn%2F7bvn0ay1FVIgkwTPSKXBh2zM0%2BWI6rvKoCCj1o7CASxvSvN9SNJ80pXfzoki6LMVUpH5GS27VfJKHbnF0pDPhqC0wUj4dVBTX0pjKyEpREmGfCd%2BmPfH8ORl%2FwaMotBCmTo7Y%2Fnw%2BB2DwL7A3wpfEi33xOEvSrtgp&spm=2014.12145346.1.0";
var host = 's.click.taobao.com';
function getItemUrl(clickUrl){
	var req1 = http.get(clickUrl,function (res1) {
		res1.on('end',function(){
			console.log('res1 end');
		}).on('close',function(){
			console.log('res1 close');
		});
		if(res1.statusCode == 302){
			var jsSrc = res1.headers.location;
			var toSrc = decodeURIComponent(jsSrc.substr(jsSrc.indexOf('tu=')+3));
			var req2 = http.request ({
				'host' : host,
				'port' : 80,
				'path' : toSrc,
				'method' : 'GET',
				'headers' : {
					'Referer' : jsSrc
				}
			},function (res2) {
				res2.on('end',function(){
					console.log('res2 end');
				}).on('close',function(){
					console.log('res2 close');
				});
				console.log(res2.headers.location);
			});
			req2.end();
		}
	});
	req1.end();

	/*var client_get_js = http.createClient(80, host);
	var request_get_js = client_get_js.request('GET',clickUrl);
	request_get_js.end();
	request_get_js.on('response', function (res1) {
		if(res1.statusCode == 302){
			var jsSrc = res1.headers.location;
			var toSrc = decodeURIComponent(jsSrc.substr(jsSrc.indexOf('tu=')+3));
			var client_get_item = http.createClient(80, host);
			var request_get_item = client_get_item.request('GET',toSrc,{
				'Referer' : jsSrc
			});
			request_get_item.end();
			request_get_item.on('response', function (res2) {
				console.log(res2.headers.location);
			});
		}
	});*/
}
var arg = process.argv;
//参数为字符串或不能有“&”,因为在命令行中“&”表示命令拼接，即在前面命令执行完后接着执行第二个命令
// if(arg.length > 2){
// 	getItemUrl(arg[2]);
// }else{
// 	getItemUrl(url);
// }
//http.createClient(80,'www.fan.com');
var req1 = http.get('http://61.4.185.48:81/g/',function (res1) {
		res1.on('end',function(){
			console.log('res1 end');
		}).on('close',function(){
			console.log('res1 close');
		}).on('data',function(d){
			console.log(d.toString());
		});
});
req1.end();