var fs = require('fs'),
	jsp = require('uglify-js').parser,
	pro = require('uglify-js').uglify,
	path = require('path');

//是否显示程序运行过程
var isShowProcess = true;
//日志方法
function myLog(){
	if(isShowProcess && arguments.length > 0){
		console.log.apply(null,Array.prototype.splice.call(arguments,0));
	}
}
//时间对象
var myTime = {
	timeList : {
		length : 0
	},
	/**设置开始时间*/
	set : function(name){
		this.timeList[name] = new Date();
	},
	/**得到运行时间*/
	get : function(name){
		var oldDate = this.timeList[name];
		if(!oldDate){
			myLog('[time not fond]',name);
			return 0;
		}
		delete this.timeList[name];
		return new Date().getTime() - oldDate.getTime();
	},
	/**得到整个压缩过程的总时间*/
	getTotalTime : function(){
		var _this = this;
		_this.timeList.length--;
		
		clearTimeout(_this.tt);
		_this.tt = setTimeout(function(){
			if(!_this.timeList.length){
				myLog('\n\r','[*** over ***','] [totalTime:',_this.get('totalTime'),'ms]');
			}
		},3);
	}
}
/**压缩单个文件*/
function buildOne(fileIn,fileOut,callback){
	path.exists(fileOut,function(exists){
		myTime.set(fileIn);
		var info = '';
		//当目标文件不存在或源文件有修改时进行压缩处理
		//(***目标文件不能人为修改**)
		if(!exists || (fs.lstatSync(fileIn).mtime > fs.lstatSync(fileOut).mtime)){
			//后缀为.js的且不是.min.js的进行压缩，否则直接进行复制(可能为非文本文件)
			if(path.extname(fileIn) == '.js' && fileIn.lastIndexOf('.min.js') != fileIn.length-7){
				var originCode = fs.readFileSync(fileIn,'utf8');
				var ast = jsp.parse(originCode);
				ast = pro.ast_lift_variables(ast);
				//过滤参数
				ast = pro.ast_mangle(ast,{
					'except' : ['require']//不希望被替换的参数
				});
				ast = pro.ast_squeeze(ast);
				
				var finalCode = pro.gen_code(ast);
				fs.writeFileSync(fileOut,finalCode,'utf8');
				myLog('\n[ *** create *** ] [time:',myTime.get(fileIn),'ms ]',fileIn,'\n');
				callback && callback();
			}else{
				copyFile(fileIn,fileOut,callback);
			}
		}else{
			myLog('[ not modify ] [time:',myTime.get(fileIn),'ms ]',fileIn);
			callback && callback();
		}
	});
}
/**遍历整个文件夹，不存在时创建*/
function buildDir(oldDir,newDir){
	myTime.set('totalTime');
	_bDir(oldDir,newDir);
	function _bDir(originDir,finalDir){
		var files = fs.readdirSync(originDir);
		path.exists(finalDir,function(exists){
			if(!exists){
				myLog('[ * dir is not exists] ',finalDir);
				fs.mkdirSync(finalDir);
			}
			files.forEach(function(file){
				var pathname = originDir + '/' + file,
					toPath = finalDir + '/' + file;
					stat = fs.lstatSync(pathname);
				
				if(stat.isDirectory()){
					myLog('[ * sub dir ]',pathname);
					_bDir(pathname,toPath);
				}else{
					myTime.timeList.length ++;
					buildOne(pathname,toPath,function(){
						myTime.getTotalTime();//得到总运行时间
					});
				}
			});
		});
	}
}
/**复制单个文件*/
function copyFile(originFile,finalFile,callback){
	var fileReadStream = fs.createReadStream(originFile);
	var fileWriteStream = fs.createWriteStream(finalFile);
	fileReadStream.pipe(fileWriteStream);

	fileWriteStream.on('close',function(){
		myLog('\n[ *** copy *** ] [time:',myTime.get(originFile),'ms ]',originFile,'\n');
		callback && callback();
	});
}
//buildOne('d:/Gc/js/global.js','d:/Gc/js_compress/a.min.js');
var sitePath = 'E:/fdx_git/fandongxi/site/';
buildDir(sitePath+'js-source',sitePath+'js');
//copyFile(sitePath+'js-source/tool/swfupload/swfupload.swf','e:/swfupload.swf');