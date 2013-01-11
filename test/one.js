console.log(123);
one = 'hello world';
require('./two');
var fs = require('fs'),
	path = require('path');
var p = 'E:\\node_api_c\;E:\\nodejsSite\\node_modules;\.node-gyp\0.8.14';
console.log('--',p,'\n');
p=path.resolve(p);
console.log('--',p,'\n');
console.log('--',process.env.HOME ,'-----', process.env.USERPROFILE,'=====',(process.env.HOME || process.env.USERPROFILE),'\n');
console.log('--',path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile'),'\n');
var homeDir = (process.env.HOME || process.env.USERPROFILE);
homeDir = homeDir.replace(/^;?(.+?);?$/,'$1');
var devDir = path.resolve(homeDir, '.node-gyp');
console.log('\n====',homeDir,'\n',devDir,'====\n');
var mk = function(pp){
	fs.mkdir(pp,function(err){
		console.log(pp,'\n');
		if(err && 'ENOENT' == err.code){
			mk(path.dirname(pp));
		}
	});
}
mk(p);
var log = require('node-gyp/node_modules/npmlog')
log.info('start unzipping and untaring','please wait a minutes');