/*
//直接操作文件
var fs = require('fs');
fs.readFile(__dirname+'/json.json',function(err,data){
    if(err) throw err;

    var jsonObj = JSON.parse(data);
    var space = ' ';
    var newLine = '\n';
    var chunks = [];    
    var length = 0;

    for(var i=0,size=jsonObj.length;i<size;i++){
        var one = jsonObj[i];
        //what value you want 
        var value1 = one['name'];
        var value2 = one['age'];
        
        var value = value1 +space+value2+space+newLine;
        var buffer = new Buffer(value);
        chunks.push(buffer);
        length += buffer.length;
    }
    
    var resultBuffer = new Buffer(length);
    for(var i=0,size=chunks.length,pos=0;i<size;i++){
        chunks[i].copy(resultBuffer,pos);
        pos += chunks[i].length;
    }
    
    fs.writeFile(__dirname+'/resut.txt',resultBuffer,function(err){
        if(err) throw err;
        console.log('has finished');
    });
    
});*/

/*
//文件流复制文件
var fs = require('fs');
var rOption = {
  flags : 'r',
  encoding : null,
  mode : 0666
}

var wOption = {
  flags: 'a',
  encoding: null,
  mode: 0666   
}

var fileReadStream = fs.createReadStream(__dirname+'/myjpg.jpg',rOption);
var fileWriteStream = fs.createWriteStream(__dirname+'/new_myjpg.jpg',wOption);

fileReadStream.on('data',function(data){
  fileWriteStream.write(data);    
});

fileReadStream.on('end',function(){
  console.log('readStream end'); 
  fileWriteStream.end();
});
*/
/*
//使用pipe 把当前的可读流和另外一个可写流连接起来。可读流中的数据会被自动写入到可写流中
var fs = require('fs');

var fileReadStream = fs.createReadStream(__dirname+'/myjpg.jpg');
var fileWriteStream = fs.createWriteStream(__dirname+'/new_myjpg2.jpg');
fileReadStream.pipe(fileWriteStream);

fileWriteStream.on('close',function(){
  console.log('copy over');  
});*/

//用这个函数可以轻松地实现一个静态资源服务器：
var http = require("http");
var fs = require("fs");
var path = require("path"); 
var url = require("url"); 

var server = http.createServer(function(req, res) {
	console.log(url.parse(req.url));
  var pathname = url.parse(req.url).pathname; 
  console.log('pathname:'+pathname);
  var filepath = path.join(__dirname, pathname); 
  console.log('filepath:'+filepath);
  var stream = fs.createReadStream(filepath, {flags : "r", encoding : null}); 
  stream.on("error", function() { 
      res.writeHead(404); 
      res.end(); 
  }); 
  stream.pipe(res);
}); 
server.on("error", function(error) { 
  console.log(error); 
}); 
server.listen(80,function(){
  console.log('server listen on 8088');
});