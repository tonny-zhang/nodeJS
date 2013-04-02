var fs = require('fs'),
	jsp = require('uglify-js').parser,
	pro = require('uglify-js').uglify;

try{
	//var originCode = fs.readFileSync('./test/index.js','utf8');
	var originCode = 'var a = 1;b=function(){if(true)test()}';
	var ast = jsp.parse(originCode);
	ast = pro.ast_lift_variables(ast);
	//过滤参数
	ast = pro.ast_mangle(ast,{
		'except' : ['require']//不希望被替换的参数
	});
	ast = pro.ast_squeeze(ast);

	var finalCode = pro.gen_code(ast);
	console.log(finalCode);
	//fs.writeFileSync('./test/index.min.js',finalCode,'utf8');
	//console.log('finished');
}catch(e){
	console.log(e.message,e.line,e.col);
}