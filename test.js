function log(){
	if(arguments.length > 0 && typeof arguments[0] == 'object'){
		logObj(arguments[0]);
		return;
	}
	console.log(Array.prototype.slice.call(arguments,0).join(' '));
}
function logObj(obj){
	console.log(obj);
}
log(global_path);
log(__filename);
log(__dirname);
logObj(module);
logObj(module.paths);
var m = module.paths.unshift('E:\\node_modules\\123');
logObj(module.paths);
module.paths.push('e:/123');
logObj(module.paths);

/*
var stdin = process.openStdin();

stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  process.stdout.write('data: ' + chunk);
  stdin.destroy();
});

stdin.on('end', function () {
  process.stdout.write('end');
});
*/
// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
log(process.execPath);
log(process.env);
log('Version: ' + process.version);
log('Prefix: ' + process.installPrefix);
log('Pid: ' + process.pid);
log('title: ' + process.title);
log('platform: ' + process.platform);
log( process.memoryUsage());

var spawn = require('child_process').spawn,
   grep  = spawn('grep', ['ssh']);

log('Spawned child pid: ' + grep.pid);
grep.stdin.end();

var fs = require('fs');
/*fs.rename('e:\\nodejsSite\\test.txt','e:\\nodejsSite\\readme.txt',function(err){
	if(err){
		throw err;
	}
	log('rename to readme.txt');
});*/
/*var states = fs.statSync('./readme.txt',function(err,stat){
	if(err)throw err;
	log(stat);
});
log(states.isFile());
*/
/*var http = require('http');
var google = http.createClient(80, 'www.fandongxi.com');
var request = google.request('GET', '/',
  {'host': 'www.fandongxi.com'});
request.end();
request.on('response', function (response) {
  console.log('STATUS: ' + response.statusCode);
  console.log('HEADERS: ' + JSON.stringify(response.headers));
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
	fs.writeFileSync('e:/nodejsSite/readme.txt', chunk, 'utf8',function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
  });
});*/

var dns = require('dns');

dns.resolve4('www.fandongxi.com', function (err, addresses) {
  if (err) throw err;

console.log('addresses: ' + JSON.stringify(addresses));

addresses.forEach(function (a) {
   dns.reverse(a, function (err, domains) {
     if (err) {
       console.log('reverse for ' + a + ' failed: ' +
         err.message);
     } else {
       console.log('reverse for ' + a + ': ' +
         JSON.stringify(domains));
     }
   });
 });
});
var ip = '1.113.158.120';
dns.reverse(ip, function (err, domains) {
 if (err) {
   console.log('reverse for ' + ip + ' failed: ' +
	 err.message);
 } else {
   console.log('reverse for ' + ip + ': ' +
	 JSON.stringify(domains));
 }
});