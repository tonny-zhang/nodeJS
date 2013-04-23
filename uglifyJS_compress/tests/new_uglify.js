var uglify = require('uglify-js');
var fs = require('fs');

var str = '';
for(var i in uglify){
	str += i+'\n';
}
fs.writeFile('./uglify-info.txt',str,function(){
	console.log('to open info file');
});


fs.readFile('./test.js','utf-8',function(err,data){
	var ast = uglify.parse(data);
	var walker = new uglify.TreeWalker(function (node, descend) {
        console.log(node);
    });

    ast.walk(walker);
});