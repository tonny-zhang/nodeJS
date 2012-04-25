var fs = require('fs'),
	path = require('path'),
	http = require('http');//'http://misc.fan.com/min/f/='

//同步创建父级目录
function mkdirSync(toPath,callback){
	var arr = toPath.split('/');
	var mode = 0755;
	if(arr[0] == '.'){
		arr.shift();
	}
	if(arr[0] == '..'){
		arr.splice(0,2,arr[0]+'/'+arr[1]);
	}
	function inner(p){
		if(p.indexOf(':') == p.length-1){
			inner(p+'/'+arr.shift());
		}else if(!path.existsSync(p)){
			console.log('create ',p);
			fs.mkdirSync(p,mode);
		}
		if(arr.length){
			inner(p+'/'+arr.shift());
		}else{
			callback();
		}
	}
	if(arr.length){
		inner(arr.shift());
	}else{
		callback();
	}
}

/**
@class compare
*/
function compare(sitePath,webSite){
	this.sitePath = sitePath,
	this.webSite = webSite;

	var fileList = {};
	var loadingFileList = [];
	//下载一个文件
	this.loadFile = function(originFile,callback){
		var _this = this;	
		var newFile = (_this.sitePath+originFile).replace('/js/','/js-web/');
		path.exists(newFile,function(exists){
			if(exists){
				//console.log(newFile,' is exists');
				callback && callback.call(null,newFile);
			}else{
				var newPath = path.dirname(newFile);
				var miniWeb = http.createClient(80,'misc.fan.com');
				var request = miniWeb.request('GET','/min/f='+originFile);
				request.end();
				request.on('response', function (response) {
					response.on('data', function (chunk) {
						mkdirSync(newPath,function(){
							fs.writeFile(newFile,chunk, 'utf8',function(){
								//console.log(newFile,' create success!');
								callback && callback.call(null,newFile);
							});
						});
					});
				});
			}
		});
	}
	/**得到结果*/
	this.getResult = function(originFile){
		var _this = this;
		var info = fileList[originFile];
		if(info && typeof info['origin'] != 'undefined' && typeof info['mini'] != 'undefined' && typeof info['web'] != 'undefined'){
			//console.log(originFile,':',info);
			loadingFileList.forEach(function(f,i){
				if(f == originFile){
					loadingFileList.splice(i,1);
					if(!loadingFileList.length){
						//console.log(fileList);
						var str = 'oring \t\t mini \t\t web \t\t js \r\n'
									+'**********************************************************************'
									+'\r\n';
						for(var jsName in fileList){
							var info = fileList[jsName];
							str += info.origin+' \t\t '+info.mini+' \t\t '+info.web+' \t\t '+jsName+' \r\n';
						};
						fs.writeFileSync(_this.sitePath+'result.txt',str);
						console.log('Have gotten result to "'+_this.sitePath+'result.txt'+'"!');
					}
				}
			});
		}
	}
	/**对比单个文件*/
	this.compareFile = function(originFile,miniFile){
		loadingFileList.push(originFile);
		var _this = this;
		fileList[originFile] = {};
		fs.stat(_this.sitePath+originFile,function(err,stat){
			fileList[originFile]['origin'] = err?-1:stat['size'];
			_this.getResult(originFile);
		});
		fs.stat(_this.sitePath+miniFile,function(err,stat){
			fileList[originFile]['mini'] = err?-1:stat['size'];
			_this.getResult(originFile);
		});
		_this.loadFile(originFile,function(newFile){
			fs.stat(newFile,function(err,stat){
				fileList[originFile]['web'] = err?-1:stat['size'];
				_this.getResult(originFile);
			});	
		});
	}
	/**对比目录*/
	this.comparePath = function(originPath,miniPath){
		var _this = this;
		fs.readdir(_this.sitePath+originPath,function(error,files){
			if(error){
				console.log(error);
				return;
			}
			files.forEach(function(file){
				var stat = fs.lstatSync(_this.sitePath+originPath+file);
				if(stat.isDirectory()){
					_this.comparePath(originPath+file+'/',miniPath+file+'/');
				}else if(path.extname(file) == '.js'){
					_this.compareFile(originPath+file,miniPath+file);
				}
			});
		});
	}
}
var sitePath = 'E:/compare_js/';
var com = new compare(sitePath);
var jsFile = 'global.js';
//com.compareFile('js/'+jsFile,sitePath+'js-min/'+jsFile);
//com.loadFile('js/global.js');
//com.compareFile('js/global.js','js-min/global.js');
com.comparePath('js/','js-min/');
//mkdirSync('E:a/b/c/');