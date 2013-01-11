var fs = require('fs'),
	less = require('less');

var fileIn = './css/base.less';
try{
	fs.readFile(fileIn,'utf8',function(e,data){
		var parser = new(less.Parser)({
			paths: ['.', './css'], // Specify search paths for @import directives
			filename: 'msg.txt' // Specify a filename, for better error messages
		});
		parser.parse(data,function(e1,tree){
			if(e1){
				console.log(e1);
				return;
			}
			try{
				var fileOut = fileIn.replace('less','css');
				var css = tree.toCSS();
				//console.log(css);
				//fs.writeFile(fileOut,css);
			}catch(ee1){
				console.log('1--1',ee1);
			}
			
		})
	});
}catch(ee){
	console.log(ee);
}