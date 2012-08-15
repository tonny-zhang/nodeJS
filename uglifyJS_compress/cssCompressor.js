var cssmin = require('node-css-compressor').cssmin;
var fs = require('fs');

var cssString = ".foobar { color : rgb(123, 123, 123); }";
console.log(cssmin(cssString));

var fileSource = 'd:/source.css';
var sourceCode = fs.readFileSync(fileSource,'utf8');

fs.writeFileSync('d:/test.css',cssmin(sourceCode),'utf8');
console.log('comress end!');

//fs.writeFileSync('d:/mini.css',fs.readFileSync('d:/mini.css','utf8').replace(/[\r\n]/g,''),'utf8');



/*

http://misc.fan.com/min/f=css2/core.css
|
|----css--1.css
|
|----img--1.jpg
|
|

url(../img/1.jpg)
http://misc.fan.com/20120709_120939/core|auth|p_user.css
rule:\d+(_\d+)?/.+\.css->/compress.php(进行压缩输出)
1.
url(../img/1.jpg)
		||
url(http://misc.fan.com/20120709_120939/../img/1.jpg)
		||
url(http://misc.fan.com/img/1.jpg)

2.
url(/img/1.jpg)
		||
url(http://misc.fan.com/img/1.jpg)
*/
